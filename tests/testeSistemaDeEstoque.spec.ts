import { test, expect } from '@playwright/test';

//1. Cadastro de Produto novo no Sistema de estoque
test.describe('Cadastro de Produto no Sistema de Estoque', () => {
    test('Cadastro de produto novo', async ({page}) => {
        await page.goto('http://urlSistemadeEstoque/registro')

        await page.fill('#tipoProduto', 'Copo')
        await page.fill('#categoriaProduto', 'Utensilio')
        await page.fill('#materialProduto', 'Vidro')

        await page.click('#cadastrarProduto')

        const mensagemConfirmacao = await page.textContent('.mensagemConfirmacao')
        expect(mensagemConfirmacao).toContain('Produto cadastrado com sucesso')
    })
})

//2. Entrada de produto cadastrado

test.describe('Entrada de produto cadastrado no estoque', () => {
    test('Entrada de produto', async ({page}) => {
        await page.goto('http://urlSistemadeEstoque/produtos')

        await page.fill('#idProduto', '123')
        await page.fill('#quantidadeProduto', '10')
        await page.click('#botaoAdicionarProduto')

        const saldoProduto = await page.textContent('.saldoProduto')
        expect(saldoProduto).toContain('10')
    })
})

//3. Saída do produto

test.describe('Saida de produto cadastrado no estoque', () => {
    test('Saida de produto', async ({page}) => {
        await page.goto('http://urlSistemadeEstoque/produtos')

        await page.fill('#idProduto', '123')
        await page.fill('#quantidadeProduto' , '10')
        await page.click('#saidaProduto')

        const saldoProduto = await page.textContent('.saldoProduto')
        expect(saldoProduto).toContain('0') 
    })
})

//4. Consulta de Saldo em Estoque

test.describe('Consulta de Saldo em Estoque', () => {
    test('Consulta de Saldo', async ({page}) => {
        await page.goto('http://urlSistemadeEstoque/consulta')

        await page.fill('#pesquisaProduto', 'Copo')
        await page.click('botaoPesquisar')

        const saldoProduto = await page.textContent('.saldoProduto')
        expect(saldoProduto).toContain('0')
    })
})