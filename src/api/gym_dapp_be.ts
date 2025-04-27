/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/gym_dapp_be.json`.
 */
export type GymDappBe = {
  address: "9akkfdTGrGZaavswyVC7jqBu3AsTBim634xuUhKSoYMr",
  metadata: {
    "name": "gymDappBe",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  instructions: [
    {
      "name": "initializeUserAccount",
      "discriminator": [
        131,
        248,
        61,
        211,
        152,
        205,
        122,
        238
      ],
      accounts: [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "useraccount",
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
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      args: [
        {
          "name": "userid",
          "type": "string"
        },
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        }
      ]
    }
  ],
  accounts: [
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  errors: [
    {
      "code": 6000,
      "name": "invalidCredentials",
      "msg": "Invalid credentials provided."
    },
    {
      "code": 6001,
      "name": "userNotFound",
      "msg": "User account not found."
    },
    {
      "code": 6002,
      "name": "invalidUserId",
      "msg": "Invalid user ID provided."
    },
    {
      "code": 6003,
      "name": "invalidUsername",
      "msg": "Invalid username provided."
    },
    {
      "code": 6004,
      "name": "invalidEmail",
      "msg": "Invalid email provided."
    },
    {
      "code": 6005,
      "name": "invalidPassword",
      "msg": "Invalid password provided."
    }
  ],
  types: [
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userid",
            "type": "string"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "password",
            "type": "string"
          }
        ]
      }
    }
  ]
};
