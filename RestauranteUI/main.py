from flask import Flask, render_template
app = Flask(__name__, static_folder="restaurantes/build/static", template_folder="restaurantes/build")


@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)