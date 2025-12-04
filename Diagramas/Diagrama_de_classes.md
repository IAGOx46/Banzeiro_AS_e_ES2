# Diagrama de Classe
No diagrama de classe, representa o arquitetura conceitual do nosso sistema de monitoramento climático o BANZEIRO, voltado para suas principais funcionalidades (níveis de rios, previsão climático) e támbem gestão de usuários e administradores. Utilizamos diferentes entitades (classes) para organizar responsabilidades, fluxo de dados e interação com API externa. 

<img width="756" height="591" alt="image" src="https://github.com/user-attachments/assets/bed58a47-a14a-4486-b5de-dd35d57b4775" />

É possivel visualizar: 

**Integração com a API externa**, responsáveis por fornecer dados do clima e nível do rios.

**Camadas de domínio**, como Nível do Rio e Previsão Climática, que processam armazenam informações coletadas.

**Gerenciamento de usuários e administrador**, permitindo autenticação, criação de contaas e geração de relatórios.

**Um controlador central**, coordernar ações como consulta, registro e persistência de dados do sistema.

