# Sistema de Monitoramento Climático — **BANZEIRO**
### Universidade Federal do Amazonas – UFAM  
### Instituto de Ciências Exatas e Tecnologia  
### Engenharia de Software II — 2025  
---
## Responsável
- **Walter Jonas de Sousa Viana**

## Equipe Responsável pela Elaboração
- Geovanni Ferreira Marques Veras  
- Iago Vinícius Farias do Amaral  
- Lucas Castro dos Anjos  
- Marcos Gabriel Liborio Pontes

---

# 1. Descrição Geral do Projeto

## 1.1 Nome do Projeto  
**Sistema de Monitoramento Climático – BANZEIRO**

## 1.2 Descrição do Produto  
Sistema WEB para monitoramento climático em tempo real, com previsões do tempo e nível dos rios, incluindo histórico dos últimos quatro dias.

## 1.3 Objetivo  
Desenvolver um sistema WEB que forneça informações climáticas precisas, integradas a fontes oficiais, auxiliando na segurança, no planejamento e nas atividades econômicas dos usuários.

## 1.4 Motivação  
A instabilidade climática crescente aumenta a demanda por sistemas que forneçam dados meteorológicos e hidrológicos confiáveis, acessíveis e integrados em uma plataforma intuitiva.

## 1.5 Equipe de Desenvolvimento – Time Scrum  
- Geovanni Ferreira M. Veras  
- Iago Vinícius F. do Amaral  
- Lucas Castro dos Anjos  
- Marcos Gabriel L. Pontes  

## 1.6 Descrição dos Usuários Finais  
- **População em Geral:** Para acompanhar clima em tempo real.  
- **Agricultores e Produtores Rurais:** Para decisões relacionadas ao plantio, colheita e prevenção de prejuízos.

# 2. Escopo

# 2.1 Escopo Específico

## 2.1.1  Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Permitir cadastro de usuários. | Alta |
| RF02 | Autenticar usuários via login e senha. | Alta |
| RF03 | Permitir consulta às previsões meteorológicas em tempo real. | Alta |
| RF04 | Exibir informações com ícones, cores acessíveis. | Média |
| RF05 | Atualização automática dos dados quando houver conexão. | Média |
| RF06 | Integração com órgãos meteorológicos oficiais. | Alta |
| RF07 | Navegação intuitiva para todos os perfis de usuários. | Média |
| RF08 | Permitir ao administrador gerenciar informações e atualizar o nivel dos rios | Alta |


## 2.1.2 Requisitos Não Funcionais

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| RNF01 | Verificação de conta | Alta | Validação |
| RNF02 | Precisão >98% para dados meteorológicos/hidrológicos. | Alta | Precisão |
| RNF03 | Interface acessível, com linguagem simples e ícones. | Alta | Interface |


## 2.1.3 Regras de Negócio

- **RN01:** Cadastro seguro usando senha e verificação de conta.  
- **RN02:** Cada usuário deve ter um perfil único salvo no banco.  
- **RN03:** Garantir integridade e confidencialidade dos dados.       
- **RN04:** Verificação de conta obrigatória e não removível.  
- **RN05:** Verificação de conta via e-mail.  

---

# 2.2 Escopo Futuro

## 2.2.1 Requisitos Funcionais Futuros

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| RNF10 | Painel com gráficos históricos e tendências. | Alta | Monitoramento |
| RNF11 | Preferências de alerta (horário e canal — SMS, e-mail, WhatsApp). | Alta | Comunicação |
| RNF12 | Compartilhamento de gráficos e relatórios. | Média | Comunicação |
| RNF13 | Cadastro e gerenciamento de comunidades ribeirinhas. | Alta | Comunidade |
| RNF14 | Receber dados de sensores IoT (nível/pluviômetro). | Alta | Integração IoT |
| RNF15 | API pública para consumo de dados. | Média | Integração |
| RNF16 | Usuários podem enviar sugestões e relatos. | Média | Feedback |
| RNF17 | Previsões matemáticas específicas para cheias. | Alta | Previsão |
| RNF18 | Módulo educacional sobre prevenção e segurança. | Média | Educação |


## 2.2.2 Requisitos Não Funcionais Futuros

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| RNF10 | Escalabilidade automática para picos de acesso. | Alta | Escalabilidade |
| RNF11 | Operações críticas respondem em até 1 segundo. | Alta | Desempenho |
| RNF12 | Compatibilidade com Android, iOS e navegadores. | Alta | Compatibilidade |
| RNF13 | Registro de ações para auditoria. | Média | Auditoria |
| RNF14 | Atualizações automáticas, sem reinstalação. | Média | Manutenibilidade |
| RNF15 | Backup automático e recuperação de falhas. | Alta | Confiabilidade |
| RNF16 | Suporte a múltiplos idiomas e formatos. | Baixa | Internacionalização |
| RNF17 | Testes automatizados para funções críticas. | Alta | Testabilidade |
| RNF18 | App móvel otimizado para baixo consumo de bateria. | Média | Eficiência |
| RF19 | Conformidade com LGPD e GDPR. | Alta | Legal |


## 2.2.3 Regras de Negócio Futuras

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RN021 | Usuário pode definir níveis/tipos de alerta. | Baixa |
| RN022 | Receber dados de sensores instalados em comunidades. | Média |
| RN023 | Relatórios semanais/mensais gerados automaticamente. | Baixa |
| RN024 | Usuários podem inserir observações locais (chuva, nível do rio). | Alta |
| RN025 | Exibir clima e nível dos rios em mapas dinâmicos. | Alta |
| RN026 | Uso de IA para prever eventos extremos. | Alta |

---

# 3.  Diagramas UML

## 3.1 Casos de Uso  

## 3.2 Diagrama de Classes 
<img width="700" height="591" alt="image" src="https://github.com/user-attachments/assets/bed58a47-a14a-4486-b5de-dd35d57b4775" />

---
### ITACOATIARA – AM, 2025

