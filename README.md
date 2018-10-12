# Superheroes Node - a tutorial to enable Payments acceptance via Payabbhi Node.js library

Superheroes Store allows purchase of a superhero, to run errands for you, by paying a random amount between ₹1 to ₹5.

The `Payments Acceptance workflow` is implemented as described in the Payabbhi [Integration Guide](https://payabbhi.com/docs/integration) using [Payabbhi Node.js Client library](https://github.com/payabbhi/payabbhi-node).

This tutorial demonstrates integration with `Payabbhi Checkout` using both [dropin](https://payabbhi.com/docs/checkout/#drop-in-checkout) and [custom](https://payabbhi.com/docs/checkout/#custom-checkout) modes.

The Superheroes tutorial is designed to take you to full implementation in four graded steps:

- Step 1 : Basic implementation of `Payments Acceptance workflow`
- Step 2 : Add `Payment Response Handling`
- Step 3 : Add `Exception Handling`
- Step 4 : Reorganize and Refactor to bring everything together

## Getting started

* Clone the Superheroes repository
* Install [Payabbhi Node.js Client library](https://github.com/payabbhi/payabbhi-node)
* Sign up for a `Payabbhi account` and download `API Keys`
* Setup the local env for running Superheroes

### Clone the Superheroes repository

```shell
$ git clone http://github.com/payabbhi/superheroes-node.git
```

### Install Payabbhi Node.js library & other dependencies

```shell
$ cd superheroes-node
$ npm install
```

NOTE: Version of Payabbhi Node.js library may be changed in `package.json`

### Sign up for a Payabbhi account and download API Keys

Next, sign up for a [Payabbhi Account](https://payabbhi.com/docs/account) and download the [API keys](https://payabbhi.com/docs/account/#api-keys) from the [Portal](https://payabbhi.com/portal).

Now, set the `PA_ACCESS_ID` and `PA_SECRET_KEY` environment variables.

```shell
$ export PA_ACCESS_ID=<your-access-id>
$ export PA_SECRET_KEY=<your-secret-key>
```

Refer to `dropin` or `custom` folders for next steps.
