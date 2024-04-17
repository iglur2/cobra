from flask import Flask, request, render_template
import random

app = Flask(__name__)

# Definindo as saudações
saudacoes_usuario = ["oi", "olá", "eae", "opa"]
clima_user = ['como esta o clima hoje', 'clima' , 'tempo'  ]
hobbie_user = ['o que voce gosta de fazer' , 'seus hobbies' , ]
comida_user = ['qual sua comida preferida', 'o que voce gosta de comer' , 'seu prato preferido']
#respostas
saudacoes_bot = ["Olá!", "Oi, como posso ajudar?", "Oi, tudo bem?", "Olá, o que você gostaria de saber?"]
clima_bot = ['hoje esta ensolarado', 'hoje esta nublado', 'hoje esta chovendo']
hobbie_bot = ['gosto de ler!' , 'gosto de jogar video games!' , 'gosto de comer!' , 'conversar é um dos meus passatempo']
comida_bot = ['shushi é bem gostoso' , 'nao consigo nem imaginar' , 'pizza gosto muito']


@app.route('/chatbot', methods=['POST'])
def chatbot():
    mensagem = request.form['mensagem'].lower()
    #resposta saudação
    if mensagem in saudacoes_usuario:
        resposta_bot = random.choice(saudacoes_bot)
    else :
        resposta_bot = f"Perdão, não consegui entender..."
    return resposta_bot

    #resposta clima

    if mensagem in clima_user:
        resposta_bot = random.choice(clima_bot)
    else :
        resposta_bot = f"Perdão, não consegui entender..."

    return resposta_bot

    if mensagem in hobbie_user:
        resposta_bot = random.choice(hobbie_bot)
    else:
        resposta_bot = f"Perdão, não consegui entender..."

        return resposta_bot
    
    
    if mensagem in comida_user:
        resposta_bot = random.choice(comida_bot)
    else:
        resposta_bot = f"Perdão, não consegui entender..."

        return resposta_bot

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
