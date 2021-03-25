from datetime import datetime
from distutils.util import strtobool
from flask import Flask, request, jsonify
import json
import os
import redis
from uuid import uuid4


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
redis = redis.from_url(os.environ.get('REDIS_URL'))


def session_key(session_id):
    if not str(session_id):
        raise ValueError('Cannot build redis session key without session_id')
    return 'session:{}'.format(str(session_id))


def generate_session_id():
    for i in range(100):
        session_id = str(uuid4())
        # Ensure the session_id hasn't been used previously
        if not redis.exists(session_key(session_id)):
            return session_id
    raise ValueError('Unable to generate a new unique session UUID.')


def save_session(session):
    allowed_keys = ['session_id', 'created', 'updated']
    redis.set(session_key(session['session_id']),
              json.dumps({ key: session[key] for key in allowed_keys }))


def get_session(session_id):
    session_json = redis.get(session_key(session_id)) or 'null'
    print(session_json)
    return json.loads(session_json)


# Routes

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/api/session/',
           methods=['POST'])
def session_post():
    now = datetime.utcnow().isoformat()
    session_id = generate_session_id()
    session = {
        'session_id': session_id,
        'created': now,
        'updated': now,
    }
    save_session(session)
    return jsonify({'created': session_id})


@app.route('/api/session/<uuid:session_id>',
           methods=['GET'])
def session_get(session_id):
    return jsonify(get_session(session_id))


if __name__ == '__main__':
    cors_origin = os.environ.get('BACKEND_CORS_ORIGIN', None)
    if cors_origin:
        from flask_cors import CORS
        CORS(app, resources={r"/api/*": {"origins": cors_origin}})
    app.debug = strtobool(os.environ.get('BACKEND_DEBUG', 'false'))
    app.run(
        host=os.environ.get('BACKEND_HOST', '127.0.0.1'),
        port=int(os.environ.get('BACKEND_PORT', '5000'))
    )
