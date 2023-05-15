// Estas funções servem para simular respostas da API para o desenvolvimento, eximindo que seja necessario a ultilização do back-end e do banco de dados para o desenvolvimento de algumas funcionalidades.

async function logIn(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password == '1234') {
                if (email == 'admin@gmail.com') {
                    resolve({
                        data: {
                            message: "User Logged In Successfully",
                            access_token: "exemple-admin-token"
                        }
                    })
                } else if (email == 'ciclista@gmail.com') {
                    resolve({
                        data: {
                            message: "User Logged In Successfully",
                            access_token: "exemple-ciclista-token"
                        }
                    })
                } else if (email == 'lojista@gmail.com') {
                    resolve({
                        data: {
                            message: "User Logged In Successfully",
                            access_token: "exemple-lojista-token"
                        }
                    })
                }
            } else {
                reject(new Error('Email ou Senha incorreta'))
            }
        }, 500)
    })
}

async function getInfos(token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token == 'exemple-admin-token') {
                resolve({
                    data: {
                        id: 1,
                        name: "Admin",
                        email: "admin@adapti.info",
                        cpf: "21339780119",
                        rg: "047894938",
                        birthday: "1972-01-16T00:00:00.000000Z",
                        phone: "(96) 94045-7063",
                        is_admin: true,
                        type: "Shopkeeper",
                        email_verified_at: "2023-05-03T18:23:58.000000Z",
                        created_at: "2023-05-03 18:23:58",
                        updated_at: "2023-05-03 18:23:58",
                        address: {
                            id: 1,
                            users_id: 1,
                            street: "Travessa Aragão",
                            number: "8833",
                            neighborhood: "do Leste",
                            city: "Santiago do Leste",
                            state: "Pará",
                            complement: null,
                            cep: "15959-175",
                            created_at: "2023-05-03 18:23:58",
                            updated_at: "2023-05-03 18:23:58"
                        }
                    }
                })
            } else if (token == 'exemple-ciclista-token') {
                resolve({
                    data: {
                        id: 1,
                        name: "Ruan Az",
                        email: "ciclista@adapti.info",
                        cpf: "21339780119",
                        rg: "047894938",
                        birthday: "1972-01-16",
                        phone: "(96) 94045-7063",
                        sexo: 'Masculino',
                        blood:'A-',
                        is_admin: false,
                        type: "Cyclist",
                        email_verified_at: "2023-05-03T18:23:58.000000Z",
                        created_at: "2023-05-03 18:23:58",
                        updated_at: "2023-05-03 18:23:58",
                        address: {
                            id: 1,
                            users_id: 1,
                            street: "Travessa Aragão",
                            number: "8833",
                            neighborhood: "do Leste",
                            city: "Santiago do Leste",
                            state: "PR",
                            complement: null,
                            cep: "15959-175",
                            created_at: "2023-05-03 18:23:58",
                            updated_at: "2023-05-03 18:23:58"
                        }
                    }
                })
            } else if (token == 'exemple-lojista-token') {
                resolve({
                    data: {
                        id: 1,
                        name: "Ruan Az",
                        email: "lojista@adapti.info",
                        cpf: "21339780119",
                        rg: "047894938",
                        birthday: "1972-01-16T00:00:00.000000Z",
                        phone: "(96) 94045-7063",
                        is_admin: false,
                        type: "Shopkeeper",
                        email_verified_at: "2023-05-03T18:23:58.000000Z",
                        created_at: "2023-05-03 18:23:58",
                        updated_at: "2023-05-03 18:23:58",
                        address: {
                            id: 1,
                            users_id: 1,
                            street: "Travessa Aragão",
                            number: "8833",
                            neighborhood: "do Leste",
                            city: "Santiago do Leste",
                            state: "Pará",
                            complement: null,
                            cep: "15959-175",
                            created_at: "2023-05-03 18:23:58",
                            updated_at: "2023-05-03 18:23:58"
                        }
                    }
                }) 
            } else {
                reject(new Error('Token não referente a uma conta ou não existente'))
            }
        }, 500)
    })
}

async function register(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.name) {
                resolve(data)
            } else {
                reject(new Error(
                    "The password confirmation does not match. (and 2 more errors)",
                    {
                        "password": [
                            "The password confirmation does not match.",
                            "The password must be at least 8 characters."
                        ],
                        rg: [
                            "The rg field is required."
                        ]
                    }
                ))
            }
        }, 500)
    })
}

export const fakeApi = {logIn, getInfos, register}