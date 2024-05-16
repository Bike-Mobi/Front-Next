const routes = {
    public: {
        site: {
            path: '/'
        },
        classificados: {
            path: '/classificados'
        },
        cadastro: {
            path: '/autenticacao/cadastro'
        },
        login: {
            path: '/autenticacao/login'
        },
        precadastro: {
            path: '/autenticacao/precadastro'
        }
    },
    private: {
        ciclista: {
            ciclistadashboard: {
                path: '/sistema/ciclistadashboard'
            },
            lojas: {
                path: '/sistema/lojas'
            },
            anuncios: {
                path: '/sistema/anuncios'
            },
            meusanuncios: {
                path: '/sistema/meusanuncios'
            },
            ciclistaperfil: {
                path: '/sistema/ciclistaperfil'
            },
            manutencoes: {
                path: '/sistema/manutencoes'
            },
            sejapremium: {
                path: '/sistema/sejapremium'
            }
        },
        lojista: {
            lojistadashboard: {
                path: '/sistema/lojistadashboard'
            },
            anuncios: {
                path: '/sistema/anuncios'
            },
            meusanuncios: {
                path: '/sistema/meusanuncios'
            },
            lojistaperfil: {
                path: '/sistema/lojistaperfil'
            },
            manutencoes: {
                path: '/sistema/manutencoes'
            },
            manutencoespadroes: {
                path: '/sistema/manutencoespadroes'
            },
            sejapremium: {
                path: '/sistema/sejapremium'
            }
        },
        admin: {
            ciclistasmanager: {
                path: '/sistema/ciclistasmanager'
            },
            lojasmanager: {
                path: '/sistema/lojasmanager'
            },
            admindash: {
                path: '/sistema/admindash'
            },
            premiumdash: {
                path: '/sistema/premiumdash'
            },
            ciclistaperfil: {
                path: '/sistema/ciclistaperfil'
            }
        }
    }
}

export const hasAccess = (path, routeAccess) => {

    const publicRoutes = Object.values(routes.public)

    if(publicRoutes.includes({path: path})) return true

    if(routeAccess){
        const privateRoutesUserCanAccess = Object.values(routes.private[routeAccess])
    
        if(privateRoutesUserCanAccess.some(route => route.path == path)) return true
        else return false
    }

}