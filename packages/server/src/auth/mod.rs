use anyhow::{anyhow, Result};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};
use rocket::serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::{str, time::Duration};

use crate::models::{Role, User};

const BEARER: &str = "BEARER ";
const JWT_SECRET: &[u8] = dotenv!("JWT_SECRET").as_bytes();
const ISSUER: &str = "PolyHx";

// https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims
#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
    /// Issuer of the JWT
    iss: String,
    /// Subject of the JWT, the ObjectId from mongdb
    sub: String,
    /// Time after which the JWT expires
    exp: u64,
    /// Time at which the JWT was issued
    iat: u64,
    name: String,
    role: Role,
}

#[derive(Debug)]
pub struct StaffUser(String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for StaffUser {
    type Error = String;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let jwts: Vec<_> = request.headers().get("Authorization").collect();
        if jwts.len() != 1 {
            return Outcome::Failure((Status::BadRequest, "Invalid amount of jwts".to_string()));
        }
        match get_staff_jwt(jwts[0]) {
            Ok(jwt) => Outcome::Success(StaffUser(jwt)),
            Err(err) => Outcome::Failure((Status::BadRequest, err.to_string())),
        }
    }
}

fn get_staff_jwt(jwt: &str) -> Result<String> {
    if !jwt.starts_with(BEARER) {
        return Err(anyhow!(
            "The authorization header must start with `{}`",
            BEARER
        ));
    }

    let decoded = decode::<Claims>(
        &jwt,
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::new(Algorithm::HS512),
    )?;

    // Make sure that the jwt is valid
    if decoded.claims.iss != "PolyHx" {
        return Err(anyhow!("Wrong issuer"));
    }
    let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();
    if decoded.claims.exp > now {
        return Err(anyhow!("jwt is expired"));
    }

    Ok(jwt.trim_start_matches(BEARER).to_string())
}

pub fn create_jwt(user: User) -> Result<String> {
    let uid = user.get_id().unwrap().to_string();
    let username = user.get_username().to_string();

    let now = SystemTime::now();
    let iat = now.duration_since(UNIX_EPOCH)?.as_secs();

    let week = Duration::from_secs(60 * 60 * 24 * 7);
    let exp: SystemTime = now + week;
    let exp = exp.duration_since(UNIX_EPOCH)?.as_secs();

    let claims = Claims {
        iss: ISSUER.to_string(),
        sub: uid,
        exp,
        iat,
        name: username,
        role: user.get_role().clone(),
    };

    let header = Header::new(Algorithm::HS512);
    let encoding_key = EncodingKey::from_secret(JWT_SECRET);

    let s = encode(&header, &claims, &encoding_key)?;
    Ok(s)
}

pub fn verify_jwt(jwt: &str) -> Result<(), String> {
    unimplemented!();
}
