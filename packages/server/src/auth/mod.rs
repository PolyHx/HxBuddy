use anyhow::{anyhow, Result};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use rocket::{
    http::HeaderMap,
    serde::{Deserialize, Serialize},
};
use std::time::{SystemTime, UNIX_EPOCH};
use std::{str, time::Duration};

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
}

fn get_jwt_from_header(headers: &HeaderMap) -> Result<String> {
    let header = headers.get("Authorization").next().unwrap();
    let auth_header = str::from_utf8(header.as_bytes())?;
    if !auth_header.starts_with(BEARER) {
        return Err(anyhow!(
            "The authorization header must start with `{}`",
            BEARER
        ));
    }
    Ok(auth_header.trim_start_matches(BEARER).to_owned())
}

// fn authorize(headers: HeaderMap) -> Result<String> {
//     let jwt = get_jwt_from_header(&headers)?;
//     let decoded = decode::<Claims>(
//         &jwt,
//         &DecodingKey::from_secret(JWT_SECRET),
//         &Validation::new(Algorithm::HS512),
//     )?;

//     Ok(decoded.claims.sub)
// }

pub fn create_jwt(uid: String, username: String) -> Result<String> {
    let now = SystemTime::now();
    let week = Duration::from_secs(60 * 60 * 24 * 7);

    // This is guaranteed to not overflow for the next 292 billion years
    let exp = now.checked_add(week).unwrap();
    // The expiration time is definitely after the unix epoch
    let exp = exp.duration_since(UNIX_EPOCH).unwrap().as_secs();

    let iat = now.duration_since(UNIX_EPOCH).unwrap().as_secs();

    let claims = Claims {
        iss: ISSUER.to_string(),
        sub: uid,
        exp,
        iat,
        name: username,
    };

    let header = Header::new(Algorithm::HS512);
    let encoding_key = EncodingKey::from_secret(JWT_SECRET);

    let s = encode(&header, &claims, &encoding_key)?;
    Ok(s)
}
