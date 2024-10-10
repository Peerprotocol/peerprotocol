/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/peer_protocol.json`.
 */
export type PeerProtocol = {
  "address": "8QFWWNuEjCuj7TYmitr5LNoFVrxbwrcCGzjSCoQcDG4h",
  "metadata": {
    "name": "peerProtocol",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "borrowSol",
      "discriminator": [
        227,
        20,
        66,
        162,
        185,
        109,
        252,
        108
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "loan",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  97,
                  110,
                  95,
                  111,
                  102,
                  102,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "loan.lender",
                "account": "loanSol"
              },
              {
                "kind": "arg",
                "path": "loanIdx"
              }
            ]
          }
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        94,
        248,
        1,
        49,
        120,
        97,
        228,
        122
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true
        },
        {
          "name": "loan",
          "writable": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "loanAta"
        },
        {
          "name": "userProfileAta"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "createLoanSol",
      "discriminator": [
        232,
        255,
        92,
        36,
        35,
        155,
        169,
        154
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "loan",
          "writable": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        213,
        243,
        25,
        38,
        153,
        143,
        156,
        55
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true
        },
        {
          "name": "loan",
          "writable": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "loanAta"
        },
        {
          "name": "userProfileAta"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
          "type": "pubkey"
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
      "name": "depositSol",
      "discriminator": [
        108,
        81,
        78,
        117,
        125,
        155,
        56,
        200
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "protocol"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        224,
        0,
        198,
        175,
        198,
        47,
        105,
        204
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAta",
          "writable": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "userProfileAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userProfile"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "protocol"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "initProtocol",
      "discriminator": [
        3,
        188,
        141,
        237,
        225,
        226,
        232,
        210
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "protocol",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "discriminator": [
        14,
        51,
        68,
        159,
        237,
        78,
        158,
        102
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "protocol"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawSol",
      "discriminator": [
        145,
        131,
        74,
        136,
        65,
        137,
        42,
        38
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "protocol"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        181,
        154,
        94,
        86,
        62,
        115,
        6,
        186
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAta",
          "writable": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "userProfileAta",
          "writable": true
        },
        {
          "name": "mint"
        },
        {
          "name": "protocol"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "loanSol",
      "discriminator": [
        144,
        236,
        102,
        29,
        184,
        194,
        121,
        121
      ]
    },
    {
      "name": "loanSpl",
      "discriminator": [
        140,
        145,
        241,
        233,
        231,
        234,
        248,
        32
      ]
    },
    {
      "name": "protocol",
      "discriminator": [
        45,
        39,
        101,
        43,
        115,
        72,
        131,
        40
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "accountInitialized",
      "msg": "Account is already initialized"
    },
    {
      "code": 6001,
      "name": "accountNotInitialized",
      "msg": "Account not initialized"
    },
    {
      "code": 6002,
      "name": "userProfileNotInitialized",
      "msg": "User profile is not initialized"
    },
    {
      "code": 6003,
      "name": "protocolNotInitialized",
      "msg": "Protocol is not initialized"
    },
    {
      "code": 6004,
      "name": "insufficientFunds",
      "msg": "Insufficient funds in the account."
    },
    {
      "code": 6005,
      "name": "notAuthorized",
      "msg": "Not authorized"
    },
    {
      "code": 6006,
      "name": "offerAlreadyAccepted",
      "msg": "Offer already accepted"
    },
    {
      "code": 6007,
      "name": "loanAlreadyAccepted",
      "msg": "Offer already expired"
    },
    {
      "code": 6008,
      "name": "loanAlreadyFulfilled",
      "msg": "Offer fulfilled"
    }
  ],
  "types": [
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
            "type": "pubkey"
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
              "option": "pubkey"
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
            "type": "pubkey"
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
            "type": "pubkey"
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
              "option": "pubkey"
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
      "name": "mintDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "decimals",
            "type": "u8"
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
                "defined": {
                  "name": "mintDetails"
                }
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
            "type": "pubkey"
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
  ]
};
