const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

async function createDiscount(req, res) {
    const {
        accessToken,
        discountAmount,
        amount,
        percentage,
        name,
        env,
        periodTime,
        anyTwoProductIds,
        OneFreeProductsIds,
        anyTwoQuantity,
        OneFreeQuantity,
        tag,
    } = req.body;

    const isProdEnv = env === 'prod';
    const squareupURL = isProdEnv
        ? 'https://connect.squareup.com/v2/catalog/object/batch-upsert'
        : 'https://connect.squareupsandbox.com/v2/catalog/object/batch-upsert';

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    const body = {
        idempotencyKey: uuidv4(),
        batches: [
            {
                objects: [
                    {
                        type: 'DISCOUNT',
                        id: '#' + name,
                        discountData: {
                            name: name,
                            percentage: percentage,
                        },
                    },
                    {
                        type: 'PRODUCT_SET',
                        id: '#AnyTwoBeers',
                        productSetData: {
                            productIdsAny: anyTwoProductIds,
                            quantityExact: anyTwoQuantity,
                        },
                    },
                    {
                        type: 'PRODUCT_SET',
                        id: '#OneFreePizza',
                        productSetData: {
                            productIdsAny: OneFreeProductsIds,
                            quantityExact: OneFreeQuantity,
                        },
                    },
                    {
                        type: 'PRODUCT_SET',
                        id: '#MatchProductSet',
                        productSetData: {
                            productIdsAll: [
                                '#TwoBeers',
                                '#OneFreePizza',
                            ],
                            quantityExact: 1,
                        },
                    },
                ],
            },
        ],
    };

    try {
        const response = await axios.post(squareupURL, body, { headers });
        console.log(response.data); // Assuming the response contains the result in the 'data' field
        res.json(response.data); // Send the response data as JSON
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }); // Send the error message as JSON
    }
}

module.exports = { createDiscount };