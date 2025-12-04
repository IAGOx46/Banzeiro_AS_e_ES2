# 🌧️ Sistema de Monitoramento Climático — **BANZEIRO**
### Universidade Federal do Amazonas – UFAM  
Instituto de Ciências Exatas e Tecnologia  
Engenharia de Software II — 2025  

---

## 👥 Equipe de Desenvolvimento (Scrum Team)
- **Geovanni Ferreira Marques Veras**  
- **Iago Vinícius Farias do Amaral**  
- **Lucas Castro dos Anjos**  
- **Marcos Gabriel Liborio Pontes**

---

# 1. 📌 Descrição Geral do Projeto

## 1.1 🏷️ Nome do Projeto
**BANZEIRO — Sistema de Monitoramento Climático**

## 1.2 🖥️ Descrição do Produto  
Sistema **WEB** para monitoramento climático em tempo real, com previsões do tempo e nível dos rios contendo histórico dos últimos quatro dias.

## 1.3 🎯 Objetivo  
Desenvolver um sistema que forneça **informações precisas e acessíveis** para auxiliar usuários em atividades cotidianas, econômicas e de segurança, por meio de integração com fontes oficiais de dados meteorológicos e hidrológicos.

## 1.4 💡 Motivação  
O aumento das instabilidades climáticas traz a necessidade de ferramentas confiáveis que auxiliem no planejamento diário, prevenindo riscos ambientais e socioeconômicos.

## 1.5 👤 Usuários Finais  

### • População em Geral  
Acompanha condições climáticas e planeja atividades diárias.

### • Agricultores e Produtores Rurais  
Dependem de previsões de clima e nível de rios para tomada de decisões estratégicas.

---

# 2. 📘 Escopo do Sistema

## 2.1 🔧 Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| **RF01** | Cadastro de usuários (ribeirinhos, pescadores, agricultores). | Alta |
| **RF02** | Autenticação via login e senha. | Alta |
| **RF03** | Consulta às previsões meteorológicas em tempo real. | Alta |
| **RF05** | Interface acessível com ícones e cores. | Média |
| **RF06** | Atualização automática dos dados. | Média |
| **RF07** | Integração com órgãos meteorológicos oficiais. | Alta |
| **RF08** | Navegação intuitiva para todos os perfis de usuário. | Média |

---

## 2.1.2 🛠️ Requisitos Não Funcionais

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| **RNF01** | Implementação de MFA (autenticação multifator). | Alta | Validação |
| **RNF03** | Acurácia >98% para dados meteorológicos. | Alta | Precisão |
| **RNF06** | Interface simples e acessível. | Alta | Interface |
| **RNF08** | Edição de alertas por meteorologistas. | Alta | Edição |
| **RNF09** | Sincronização automática de preferências. | Média | Sincronização |

---

## 2.1.3 📜 Regras de Negócio

- **RN01** — Cadastro seguro com MFA.  
- **RN02** — Cada usuário possui perfil único com preferências salvas.  
- **RN03** — Preferências carregadas no login.  
- **RN04** — Garantia de integridade e confidencialidade dos dados.  
- **RN05** — Armazenamento da rotina dos pescadores para previsões personalizadas.  
- **RN06** — Previsões consideram maré, vento, chuva, temperatura.  
- **RN07** — Clima personalizado exclusivo para pescadores ribeirinhos.  
- **RN08** — Atualização automática de dados personalizados.  
- **RN09** — Integração com dados fluviais oficiais.  
- **RN10** — Classificação do nível do rio: normal, atenção, crítico.  
- **RN12** — Notificações mesmo em segundo plano.  
- **RN13** — MFA obrigatório e não desativável.  
- **RN14** — Segundo fator via e-mail.  

---

# 2.2 🔮 Escopo Futuro

## 2.2.1 Requisitos Funcionais Futuros

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| **RNF10** | Painel interativo com gráficos históricos. | Alta | Monitoramento |
| **RNF11** | Preferências de alerta via SMS, e-mail ou WhatsApp. | Alta | Comunicação |
| **RNF12** | Compartilhamento de relatórios e gráficos. | Média | Comunicação |
| **RNF13** | Cadastro e gerenciamento de comunidades ribeirinhas. | Alta | Usuários |
| **RNF14** | Integração com sensores IoT. | Alta | IoT |
| **RNF15** | API pública do Banzeiro. | Média | Integração |
| **RNF16** | Envio de sugestões e relatos. | Média | Feedback |
| **RNF17** | Previsões específicas de cheias com modelos matemáticos. | Alta | Previsão |
| **RNF18** | Módulo educacional de prevenção. | Média | Educação |

---

## 2.2.2 Requisitos Não Funcionais Futuros

| ID | Descrição | Prioridade | Categoria |
|----|-----------|------------|-----------|
| **RNF10** | Escalabilidade automática com múltiplas instâncias. | Alta | Escalabilidade |
| **RNF11** | Operações críticas respondendo até 1 segundo. | Alta | Desempenho |
| **RNF12** | Compatibilidade com Android, iOS e navegadores. | Alta | Compatibilidade |
| **RNF13** | Auditoria completa de ações. | Média | Auditoria |
| **RNF14** | Atualizações automáticas. | Média | Manutenibilidade |
| **RNF15** | Backup e recuperação automática. | Alta | Confiabilidade |
| **RNF16** | Suporte a múltiplos idiomas. | Baixa | Internacionalização |
| **RNF17** | Testes automatizados para funções críticas. | Alta | Testabilidade |
| **RNF18** | Baixo consumo de bateria. | Média | Eficiência |
| **RF19** | Conformidade com LGPD/GDPR. | Alta | Legal |

---

# 3. 📊 Diagramas UML

## 3.1 Caso de Uso  
*(Inserir imagem aqui no GitHub se desejar)*

## 3.2 Diagrama de Classes  
*(Inserir imagem do diagrama de classes aqui)*

---

# 🏁 ITACOATIARA – AM, 2025

