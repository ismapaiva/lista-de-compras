cliente = {
    nome: "Isma",
    idade: 31,
}
console.log(cliente)
console.log(cliente.nome)

cliente.genero = "masculino"
console.log(cliente.genero)
cliente['cidade'] = "sao paulo"
console.log(cliente.cidade)

delete cliente.cidade
delete cliente['genero']

console.log(cliente, ` deletadoss`)