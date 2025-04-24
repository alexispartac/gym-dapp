
export type GymDappBe = {
  "address": "9akkfdTGrGZaavswyVC7jqBu3AsTBim634xuUhKSoYMr",
  "metadata": {
    "name": "gymDappBe",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
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
        },
        {
          "name": "userId",
          "type": "string"
        }
      ]
    },
    {
      "name": "loginUser",
      "discriminator": [
        90,
        4,
        186,
        228,
        135,
        161,
        83,
        37
      ],
      "accounts": [
        {
          "name": "userAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "discriminator": [
        211,
        33,
        136,
        16,
        186,
        110,
        242,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCredentials",
      "msg": "Invalid username or password."
    }
  ],
  "types": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
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
          },
          {
            "name": "userId",
            "type": "string"
          }
        ]
      }
    }
  ]
};
