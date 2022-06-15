use rocket::serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UserLogin {
    username: String,
    password: String,
}

impl UserLogin {
    #[cfg(test)]
    pub fn new(username: String, password: String) -> Self {
        Self { username, password }
    }

    pub fn get_username(&self) -> &str {
        &self.username
    }

    pub fn get_password(&self) -> &str {
        &self.password
    }
}
