fn main() {
    let bytes: Vec<u8> = vec![67, 79, 76, 76, 65, 84, 69, 82, 73, 65, 76, 95, 84, 65, 71];
    let string: &str = std::str::from_utf8(&bytes).unwrap();
    println!("{}", string); // prints "Hello"
}
