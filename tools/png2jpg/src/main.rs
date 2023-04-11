extern crate getopts;
use getopts::Options;
use std::{env, fs::File};

fn do_work(folder: &str, width: u32, height: u32, mode: image::imageops::FilterType) {
    let exts: Vec<&str> = vec!["png", "jpg", "jpeg", "JPG", "PNG"];
    println!("target folder: {folder}");
    for file in std::fs::read_dir(folder).unwrap() {
        let path = file.unwrap().path();
        if path.is_file() {
            let extension = match path.extension() {
                Some(ext) => ext.to_str().unwrap(),
                _ => break,
            };
            if exts.contains(&extension) {
                //文件后缀判断
                let file_name = path.file_name().unwrap().to_str().unwrap();
                println!("開始壓縮 {file_name}");
                let tiny = match image::open(&path) {
                    Ok(image) => image,
                    _ => {
                        println!("{file_name} 压缩失败,图片格式有误，可以使用画图工具打开重新保存");
                        break;
                    }
                };
                let scaled = tiny.resize(width, height, mode); //使用这个算法进行压缩
                let mut output = File::create(path).unwrap();
                scaled
                    .write_to(&mut output, image::ImageFormat::Jpeg)
                    .unwrap(); //都输出成jpg格式
            }
        }
    }
}

fn print_usage(program: &str, opts: Options) {
    let brief = format!("Usage: {program} FOLDER [options]");
    print!("{}", opts.usage(&brief));
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let program = args[0].clone();

    let mut opts = Options::new();
    opts.optflag("h", "help", "print this help menu");
    opts.optopt("w", "maxWidth", "target max width", "width");
    opts.optopt("k", "maxHeight", "target max height", "height");
    opts.optopt("m", "compressMode", "which algo to compress 0 ~ 4", "mode");
    let matches = match opts.parse(&args[1..]) {
        Ok(m) => m,
        Err(f) => {
            panic!("{}", f.to_string())
        }
    };
    if matches.opt_present("h") {
        println!("input target folder, it can compress all image");
        println!("compress mode:");
        print!(
            "0 => image::imageops::FilterType::Nearest.to_owned()\n,
        1 => image::imageops::FilterType::Triangle.to_owned()\n,
        2 => image::imageops::FilterType::CatmullRom.to_owned()\n,
        3 => image::imageops::FilterType::Gaussian.to_owned()\n,
        4 => image::imageops::FilterType::Lanczos3.to_owned()\n"
        );
        println!(" ");
        print_usage(&program, opts);
        return;
    }

    let input = if !matches.free.is_empty() {
        matches.free[0].clone()
    } else {
        print_usage(&program, opts);
        return;
    };

    let max_width = matches.opt_str("w").unwrap_or("1200".to_string());
    let max_height = matches.opt_str("k").unwrap_or("800".to_string());
    let compress_mode = matches.opt_str("m").unwrap_or("0".to_string());
    let mode_num = compress_mode.parse::<i32>().unwrap();

    let mode = match mode_num {
        0 => image::imageops::FilterType::Nearest.to_owned(),
        1 => image::imageops::FilterType::Triangle.to_owned(),
        2 => image::imageops::FilterType::CatmullRom.to_owned(),
        3 => image::imageops::FilterType::Gaussian.to_owned(),
        4 => image::imageops::FilterType::Lanczos3.to_owned(),
        _ => image::imageops::FilterType::Nearest.to_owned(),
    };

    do_work(
        &input,
        max_width.parse().unwrap(),
        max_height.parse().unwrap(),
        mode,
    );
}
