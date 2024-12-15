const RegisterValidation = {
    type: 'object',
    required: ['name', 'nik', 'password'],
    properties: {
        name: {
            type: 'string',
            minLength: 5
        },
        nik: {
            type: 'string',       // Menggunakan string untuk validasi panjang
            minLength: 10,        // Panjang minimum 10 karakter
            maxLength: 11,        // Panjang maksimum 11 karakter
            pattern: '^[0-9]+$',  // Validasi bahwa hanya angka yang diizinkan
        },
        password: {
            type: 'string',
            minLength: 8
        },
    },
}

export {
    RegisterValidation
}
