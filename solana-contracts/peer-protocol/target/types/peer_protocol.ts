export type PeerProtocol = {
  "version": "0.1.0",
  "name": "peer_protocol",
  "instructions": [
    {
      "name": "initProtocol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createLoanSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ltvRatio",
          "type": "u16"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "loanAmount",
          "type": "u64"
        },
        {
          "name": "interestRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "createLoanSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loanAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ltvRatio",
          "type": "u16"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "loanAmount",
          "type": "u64"
        },
        {
          "name": "interestRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "borrowSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "loanIdx",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loanAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "loanIdx",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "loanSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrower",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "isAccepted",
            "type": "bool"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "loanSpl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrower",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "isAccepted",
            "type": "bool"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "loanContract",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrower",
            "type": "publicKey"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "collateralMint",
            "type": "publicKey"
          },
          {
            "name": "collateralAmount",
            "type": "u64"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "loanTokenMint",
            "type": "publicKey"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "offerCreatedAt",
            "type": "i64"
          },
          {
            "name": "offerExpiresAt",
            "type": "i64"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "protocol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "whitelistedMints",
            "type": {
              "vec": {
                "defined": "MintDetails"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lendingCount",
            "type": "u64"
          },
          {
            "name": "borrowingCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MintDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccountInitialized",
      "msg": "Account is already initialized"
    },
    {
      "code": 6001,
      "name": "AccountNotInitialized",
      "msg": "Account not initialized"
    },
    {
      "code": 6002,
      "name": "UserProfileNotInitialized",
      "msg": "User profile is not initialized"
    },
    {
      "code": 6003,
      "name": "ProtocolNotInitialized",
      "msg": "Protocol is not initialized"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds in the account."
    },
    {
      "code": 6005,
      "name": "NotAuthorized",
      "msg": "Not authorized"
    },
    {
      "code": 6006,
      "name": "OfferAlreadyAccepted",
      "msg": "Offer already accepted"
    },
    {
      "code": 6007,
      "name": "LoanAlreadyAccepted",
      "msg": "Offer already expired"
    },
    {
      "code": 6008,
      "name": "LoanAlreadyFulfilled",
      "msg": "Offer fulfilled"
    }
  ]
};

export const IDL: PeerProtocol = {
  "version": "0.1.0",
  "name": "peer_protocol",
  "instructions": [
    {
      "name": "initProtocol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "protocol",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "protocol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createLoanSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ltvRatio",
          "type": "u16"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "loanAmount",
          "type": "u64"
        },
        {
          "name": "interestRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "createLoanSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loanAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ltvRatio",
          "type": "u16"
        },
        {
          "name": "duration",
          "type": "i64"
        },
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "loanAmount",
          "type": "u64"
        },
        {
          "name": "interestRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "borrowSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "loanIdx",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowSpl",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loan",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "loanAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "loanIdx",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "loanSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrower",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "isAccepted",
            "type": "bool"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "loanSpl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrower",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "isAccepted",
            "type": "bool"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "loanContract",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrower",
            "type": "publicKey"
          },
          {
            "name": "lender",
            "type": "publicKey"
          },
          {
            "name": "collateralMint",
            "type": "publicKey"
          },
          {
            "name": "collateralAmount",
            "type": "u64"
          },
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "loanTokenMint",
            "type": "publicKey"
          },
          {
            "name": "interestRate",
            "type": "u16"
          },
          {
            "name": "duration",
            "type": "i64"
          },
          {
            "name": "ltvRatio",
            "type": "u16"
          },
          {
            "name": "offerCreatedAt",
            "type": "i64"
          },
          {
            "name": "offerExpiresAt",
            "type": "i64"
          },
          {
            "name": "isFulfilled",
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "type": "bool"
          },
          {
            "name": "collateralReturned",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "protocol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "whitelistedMints",
            "type": {
              "vec": {
                "defined": "MintDetails"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInit",
            "type": "bool"
          },
          {
            "name": "lendingCount",
            "type": "u64"
          },
          {
            "name": "borrowingCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MintDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccountInitialized",
      "msg": "Account is already initialized"
    },
    {
      "code": 6001,
      "name": "AccountNotInitialized",
      "msg": "Account not initialized"
    },
    {
      "code": 6002,
      "name": "UserProfileNotInitialized",
      "msg": "User profile is not initialized"
    },
    {
      "code": 6003,
      "name": "ProtocolNotInitialized",
      "msg": "Protocol is not initialized"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds in the account."
    },
    {
      "code": 6005,
      "name": "NotAuthorized",
      "msg": "Not authorized"
    },
    {
      "code": 6006,
      "name": "OfferAlreadyAccepted",
      "msg": "Offer already accepted"
    },
    {
      "code": 6007,
      "name": "LoanAlreadyAccepted",
      "msg": "Offer already expired"
    },
    {
      "code": 6008,
      "name": "LoanAlreadyFulfilled",
      "msg": "Offer fulfilled"
    }
  ]
};
