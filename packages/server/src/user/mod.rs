extern crate bcrypt;
use bcrypt::{hash, DEFAULT_COST};
use mongodb::bson::oid::ObjectId;
use rocket::serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    id: Option<ObjectId>,
    username: String,
    password: String,
}

impl User {
    #[cfg(test)]
    pub fn new(username: String, password: String) -> Self {
        Self {
            id: None,
            username,
            password,
        }
    }

    pub fn get_username(&self) -> &String {
        &self.username
    }

    pub fn get_id(&self) -> Option<ObjectId> {
        self.id
    }

    pub fn register(&self) {
        // Hash password
        let hash = hash(&self.password, DEFAULT_COST);
        println!("{:#?}", hash);
        // Save to db
    }
}
