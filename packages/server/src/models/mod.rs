use mongodb::bson::oid::ObjectId;
use rocket::serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Food {
    first_supper: bool,
    first_breakfast: bool,
    first_dinner: bool,
}

impl Food {
    pub fn new() -> Self {
        Self {
            first_supper: false,
            first_breakfast: false,
            first_dinner: false,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct QuizAnswer {
    fullname: String,
    email: String,
    school_level: String,
    field_of_study: String,
    experiences: Vec<String>,
    skills: u8,
    participation_reason: String,
    tshirt_size: TshirtSize,
    linkedin: String,
    github: String,
    cv: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Raffle {
    raffles: Vec<ObjectId>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum Role {
    /// Can display their qr code to redeem food and participate in raffles
    Participant(Option<Team>),
    /// Can scan participants qr code
    Staff,
    /// Can scan users qr code and access their resume
    Sponsors,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Team {
    id: ObjectId,
    name: String,
    participants: Vec<ObjectId>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum TshirtSize {
    Small,
    Medium,
    Large,
    XLarge,
    XXLarge,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    id: Option<ObjectId>,
    username: String,
    password: String,
    role: Role,
    quiz_answer: Option<QuizAnswer>,
    food: Food,
    // Wil be move away from the User
    // raffle: Raffle,
}

impl User {
    pub fn new(username: String, password: String) -> Self {
        Self {
            username,
            password,
            role: Role::Participant(None),
            id: None,
            quiz_answer: None,
            food: Food::new(),
        }
    }

    pub fn get_username(&self) -> &String {
        &self.username
    }

    pub fn get_id(&self) -> Option<ObjectId> {
        self.id
    }

    pub fn get_role(&self) -> &Role {
        &self.role
    }

    pub fn set_id(&mut self, id: Option<ObjectId>) {
        self.id = id;
    }
}
