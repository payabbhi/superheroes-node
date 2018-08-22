# Custom Checkout Tutorial

## Step 1: Getting Started

Step 1 is the first level of our tutorial. We will be building a Superhero Store where a superhero can be purchased by paying a random amount between ₹1 to ₹5.

The `Payments Acceptance workflow` is implemented as described in the Payabbhi [Integration Guide](https://payabbhi.com/docs/integration).

Before proceeding with this tutorial, make sure you have done the following:
1. Installed [Node.js](https://nodejs.org/en/) v7.6.0 and later
2. Cloned this repository on your computer and installed the dependencies
```shell
$ git clone http://github.com/payabbhi/superheroes-node.git
$ cd superheroes-node
$ npm install
```
Please ensure that you have added following *dependencies* to your *package.json.*
```
"dependencies": {
    "payabbhi": "^1.0.0",
  }
```
3. Signed up for your [Payabbhi Account](https://payabbhi.com/docs/account)
4. Downloaded the [API keys](https://payabbhi.com/docs/account/#api-keys) from the [Portal](https://payabbhi.com/portal).

Now, set the `PA_ACCESS_ID` and `PA_SECRET_KEY` environment variables with your id and key and execute the following command to start the superheroes app.

```shell
$ export PA_ACCESS_ID=<your-access-id>
$ export PA_SECRET_KEY=<your-secret-key>
$ npm run custom1
```
Now visit the url i.e. http://127.0.0.1:3000/ in your browser to see `step 1` of this tutorial in action.

------

Browse the code to check how the [Payments Acceptance workflow](https://payabbhi.com/docs/integration) is implemented.

1. We first create a Payabbhi order by calling the `Create Order API`.
2. Then we integrate with Payabbhi `Custom Checkout` as per [Web Checkout](https://payabbhi.com/docs/checkout) Guide.
3. For `Checkout flows` in test mode, we use [Test Cards](https://payabbhi.com/docs/account).
4. After successful payment, the JavaScript handler submits the `Payment response` to the `Status` page.
5. Then we display the success message to the customer along with the orderID and paymentID.

----

To verify your integration, you can call the [Payments API](https://payabbhi.com/docs/api/#payments) or you can check the list of payments in the [Payabbhi Portal](https://payabbhi.com/portal/payments).

## Step 2: Handling Payment Response

In Step 2, we build upon the code in Step 1 by adding [Payment Response Handling](https://payabbhi.com/docs/integration/#payment-response-handling).

After successful payment, the JavaScript handler submits the `Payment response` to the `Status` page.

In status function, we verify the `Payment response` via the utility function in the client library.

To execute source code of step 2 use
```shell
$ npm run custom2
```


# Step 3: Error Handling

In Step 3, we further enhance the code by adding basic `error handling` and also show you how to debug any possible errors in your code.

Refer to [Exception Handling](https://payabbhi.com/docs/api/?python#errors) for documentation of exception classes.

----

First deliberately introduce changes in the arguments to see the error flows.
e.g. change the amount argument to `Create Order` to an amount less that ₹1 or leave out required arguments to `Checkout` or pass an incorrect paymentID to the `verify_payment_signature` method etc.

To execute source code of step 3 use
```shell
$ npm run custom3
```

Now hit the root url i.e. http://127.0.0.1:3000/ to see how the error message from the `Payabbhi Client Library` is displayed in the page.

Check the code to see how the `Library Exceptions`, which typically wrap the [API Errors](https://payabbhi.com/docs/api#errors), are handled.

-----

For `Checkout flows` in test mode, you may deliberately not use the [Test Cards](https://payabbhi.com/docs/account) to try out the validations.

You may also choose to click on the `Declined` button in `test mode` to see the alternative flow.

For failed payments, you may check the `error_code` and `error_description` attributes via [Payments API](https://payabbhi.com/docs/api/#payments) or check the payments list in [Portal](https://payabbhi.com/portal/payments).


## Step 4: Refactoring

In Step 4, we bring all the pieces from preceding steps together. The code is reorganized and refactored to give a working sample app based on this `Client Library`.

To execute source code of step 4 use
```shell
$ npm run custom4
```


-----

Congrats! You are all set to enable Payabbhi [Payments Acceptance](https://payabbhi.com/docs/integration) in your solution.
