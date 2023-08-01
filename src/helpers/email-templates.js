const templateEmailRegister = (data) =>
  `<b>Avaliação de ${data.name} - ${data.email}</b><br/><br/>
<b>1 - Seu nome completo, peso em jejum, altura e idade.</b><br/>
${data.question1}<br/><br/>
<b>2 - Medidas em jejum da cintura (abaixo da última costela), abdômen inferior (logo abaixo do umbigo) e quadril (mulheres). Caso queira ou for solicitado pode enviar medidas extras (ex: braços relaxados e contraídos, tórax, coxa medial, etc)</b><br/>
${data.question2}<br/><br/>
<b>3 - Possui alguma avaliação física recente? (Informe a data da avaliação)</b><br/>
${data.question3}<br/><br/>
<b>4 - Rotina - horário que acorda, horário que costuma dormir, horário de trabalho, como é seu emprego, horário de treino, atividades do dia a dia. (estuda, trabalha, etc)</b><br/>
${data.question4}<br/><br/>
<b>5 - Costuma dormir bem? Como anda a qualidade do sono? Quantas horas em média?</b><br/>
${data.question5}<br/><br/>
<b>6 - Como se sente em relação ao seu físico?</b><br/>
${data.question6}<br/><br/>
<b>7 - Qual seu objetivo a curto e longo prazo?</b><br/>
${data.question7}<br/><br/>
<b>8 - Faz quanto tempo que treina? (musculação, lutas, corrida, ciclismo, etc)</b><br/>
${data.question8}<br/><br/>
<b>9 - Divisão de treino atual na musculação (quantas vezes treina na semana, grupos musculares do dia, quantida de séries, etc). Caso fizer outros exercícios descreva o treino e frequência.</b><br/>
${data.question9}<br/><br/>
<b>10 - Quantas vezes pode treinar na semana? E qual o horário?</b><br/>
${data.question10}<br/><br/>
<b>11 - Como está sua alimentação? (horários, alimentos, quantidades)</b><br/>
${data.question11}<br/><br/>
<b>12 - Quantas vezes pode comer no dia? Quais horários?</b><br/>
${data.question12}<br/><br/>
<b>13 - Apresenta histórico de lesão e/ou cirurgias?</b><br/>
${data.question13}<br/><br/>
<b>14 - Experiência com ciclos (anabolizantes sintéticos)? Se sim, qual o período de uso, dosagens e fármacos? Está usando algo agora? Qual a dose atual?</b><br/>
${data.question14}<br/><br/>
<b>15 - Está em uso de algum medicamento e/ou suplemento? Quais? E quais as dosagens?</b><br/>
${data.question15}<br/><br/>
<b>16 - Apresenta aversão ou intolerância com algum alimento?</b><br/>
${data.question16}<br/><br/>
<b>17 - Apresenta algum problema de saúde? Histórico familiar de alguma patologia?</b><br/>
${data.question17}<br/><br/>
<b>18 - Exames laboratoriais recentes?</b><br/>
${data.question18}<br/><br/>
<b>19 - Descreva sua evolução nos últimos meses.</b><br/>
${data.question19}<br/><br/>
<b>20 - Fotos</b><br/>
${data.question20}<br/><br/>`

module.exports = { templateEmailRegister }
