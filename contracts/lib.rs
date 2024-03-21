use anchor_lang::prelude::*;

pub mod constant;
pub mod error;
pub mod states;

use crate::{constant::*,error::*,states::*};

declare_id!("CikEi4TuJUYgYQAcV4pryWw2sU6qbFGSv6msSM3dH4cr")

#[program]
