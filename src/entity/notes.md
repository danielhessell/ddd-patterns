# Entidades

## Entidade vs Entidade Anêmica

Uma entidade é uma classe/entidade que contém um ID único, valores que alteram com o tempo, tem comportamento e regras de negócios\*.
Já uma entidade anêmica é basicamente uma entidade que contém um ID único, atributos e apenas seus Getters e Setters.

## Regras de Negócios

São formas de mudar o comportamento da sua entidade aplicando validações, fórmulas, qualquer coisa que satisfaça o que o sistema está pedindo.

---

```ts
// Sem nenhuma expressividade, apenas uma forma de mudar o atributo
set name(name: string) {
  this._name = name;
}

// Muito mais epressivo, semântico, com uma função específica (inteção de negócio)
changeName(name: string) {
  this._name = name;
}
```

`set active = true` ou `set active = false` para informar se um usuário está ativo ou não, representa alguma coisa? Não representa nada, porque a intenção do sistema não é falar de alguma coisa é `true` ou `false`, a inteção de mudança nesse cara é ativar ou desativar determinado cliente/usuário.

```ts
activate() {
  this._active = true;
}

deactivate() {
  this._active = false;
}
```
