require.config({

    baseUrl: 'app',

    urlArgs: 'bust=' + ( new Date() ).getTime(), // Pop that cache

    paths: {
    }

});

require(['dolphin']);

