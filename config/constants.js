module.exports = {

    'responseStatus': {
        'BAD_REQUEST': 400,
        'SUCCESS': 200,
        'INTERNAL_SERVER_ERROR': 500,
        'UN_AUTHORIZED': 401,
        'FORBIDDEN': 403,
    },
    'cronTimings': {
        'mailMessageCron': '*/10 * * * * *',
    },
    'FILE_UPLOAD_DIRECTORY': {
        'USER': 'user',
        'CHAT_MEDIA': 'chat_media',
    },
    'MEDIA_TYPE_ALLOW_FOR_CHAT': {
        'IMAGES': 1,
        'AUDIO': 2,
        'VIDEO': 3,
        'DOCUMENT': 4,
    },
    // media size in mb
    'MEDIA_TYPE_SIZE': {
        'IMAGES': 5,
        'AUDIO': 10,
        'VIDEO': 20,
        'DOCUMENT': 10,
    },

    'IMAGE_EXTENSION_ALLOWED': ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'],
    'DEFAULT_LOG_DIR': 'logs',
    'LOG_TYPE': ['error', 'webhook', 'warning', 'cron', 'info'],
};
