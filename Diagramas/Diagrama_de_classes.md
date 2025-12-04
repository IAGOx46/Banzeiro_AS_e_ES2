
<img width="756" height="591" alt="image" src="https://github.com/user-attachments/assets/bed58a47-a14a-4486-b5de-dd35d57b4775" />

# Diagrama de Classe
No diagrama de calsse, representa o arquitetura conceitual do nosso sitema de monitoramento climático o BANZEIRO, voltado para suas principais funcionalidade (níveis de rios, privisão climático) e támbem gestão de usuários e administradores. Utlizamos diferentes entitades (classes) para organizar responsabilidades, fluxo de dados e interação com APIs externas. 

É possivel visualizar: 

**Intergração com as APIs externas**, responsaveis por fornece dados do clima e nível do rios.

**Camadas de domínio**, como Nível do Rio e Previsão Climática, que processam armazenam informações coletadas.

**Gerenciamento de usuários e administrador**, permitindo autenticação, criação de contaas e geração de relatórios.

**Um controlador central**, coordernar ações como consulta, registro e persistência de dados do sistema.

