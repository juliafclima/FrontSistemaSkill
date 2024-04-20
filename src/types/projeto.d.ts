declare namespace Projeto {
    type Usuario = {
        id?: number;
        login: string;
        senha: string;
        confSenha?: string;
    };

    type Skill = {
        id?: number;
        nome: string;
        level: string;
        descricao: string;
        url: string;
    };

    type UsuarioSkill = {
        id?: number;
        usuario: Usuario;
        skill: Skill;
        level: string;
    };

    type UsuarioLogin = {
        id?: number;
        login: string;
        senha: string;
    };
}
