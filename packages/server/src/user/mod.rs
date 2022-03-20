extern crate bcrypt;
use bcrypt::{hash, DEFAULT_COST};
use rocket::serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    username: String,
    password: String,
}

impl User {
    pub fn get_username(&self) -> &String {
        &self.username
    }

    pub fn register(&self) {
        // Hash password
        let hash = hash(&self.password, DEFAULT_COST);
        println!("{:#?}", hash);
        // Save to db
    }
}
