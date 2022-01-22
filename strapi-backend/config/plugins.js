module.exports = ({ env }) => ({
    // ...
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: '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',
        },
        settings: {
            defaultFrom: 'prateekgupta@em8675.dkt.co.in',
            defaultReplyTo: 'prateekgupta@em8675.dkt.co.in',
            testAddress: 'prateekgupta@em8675.dkt.co.in',
        },
    },
    // ...
});