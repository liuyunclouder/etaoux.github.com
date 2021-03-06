# encoding: utf-8
require 'rubygems'
require 'bundler/setup'
require 'less'

public_dir = '_site'
deploy_dir = '_deploy'

desc "打包、压缩资源文件"
task :lessc do
  path = 'assets/css'
  Dir.glob("#{path}/**/*.less").each do |lessfile|
    cssfile = lessfile.sub(/\.less$/, '.css')
    compile(lessfile, cssfile)
  end
end

desc "生成网站"
task :build => [:lessc] do
  system "jekyll"
end

desc "发布到 Github"
task :deploy => ["build"] do
  puts "## 发布当前分支到 Github Pages "
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Commiting: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated website"
    system "git push origin master --force"
    puts "\n## Github Pages deploy complete"
  end
end

# Parse the source lessfile and write to target cssfile
def compile(lessfile, cssfile)
  parser = ::Less::Parser.new :paths => ['assets/css'], :filename => lessfile
  File.open(lessfile,'r') do |infile|
    File.open(cssfile,'w') do |outfile|
      tree = parser.parse(infile.read)
      outfile << tree.to_css(:compress => true)
    end
  end
  puts "Compiled #{lessfile}"
rescue Exception => e
  puts "Compiling #{lessfile} failed with message: #{e.message}"
end