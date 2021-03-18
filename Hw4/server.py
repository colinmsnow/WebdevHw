from flask import Flask, jsonify, send_from_directory, request
import uuid
import datetime
import copy
import requests

app = Flask(__name__)

PORT = 8080
IMAGES_FOLDER = 'image'
PICTURES = {} # This is where the data is stored.
# Its a gross global dictionary but jsonify likes dicts so its easier this way

def create_picture(source):
    """ Creates a picture object which stores a unique id, timestamp, comments, and the image source as a filename """
    return {"id": str(uuid.uuid1()), "timestamp": datetime.datetime.now().isoformat(), "source": source, "comments": []}


def add_image(images, source):
    """Adds an image to an existing image dict.
    Assigns a unique id which it can be accessed by

    ex. 

    {
        "<random id>" : {"id":<id>, "timestamp": <timestamp>, "source":, <source>, "comments": ,comments>},
        "<another random id>" : {"id":<id>, "timestamp": <timestamp>, "source":, <source>, "comments": ,comments>}
    }
    """
    pic = create_picture(source)
    images[pic["id"]] = pic
    return (images, pic["id"])


# we need this or else it shuts down post requests
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response     


# Test route
@app.route('/test')
def test_route():
    # this will be interpreted by a browser as a (very) broken-down HTML doc
    return "Hello world"


@app.route('/pictures') # works
def get_pictures():
    filteredPics = copy.deepcopy(PICTURES)
    print(filteredPics)
    for i in filteredPics.values():
        i.pop("source")
        i["comments"] = len(i["comments"])
    result = {'pictures': filteredPics}
    return jsonify(result)


@app.route('/picture/<ID>') # works
def get_picture(ID):
    pic = PICTURES[ID]
    print("Pic is: " + str(pic))
    filename = pic["source"]

    result = {'picture': pic}
    return jsonify(result)


@app.route('/new-picture-url', methods=['POST']) # works
def add_picture():

    global PICTURES

    print("GOT A REQUEST")
    
    data = request.get_json()
    print("DATA: " + str(data))
    link = data
    print("LINK: " + str(link))

    picID = str(uuid.uuid1()) + ".jpg"
    print(picID)

    PICTURES, new_id = add_image(PICTURES, picID)
    r = requests.get(link)
    print ("PICTURES: " + str(PICTURES))

    with open(IMAGES_FOLDER + "/" + picID, 'wb') as f:
        f.write(r.content)

    return_data = {"id": new_id, "timestamp": PICTURES[new_id]["timestamp"]}

    return jsonify(return_data)


@app.route('/comments/<ID>') # get route
def get_comments(ID):
    pass


@app.route('/new-comment/<ID>', methods=['POST']) # post route
def new_comment(ID):
    pass

@app.route('/<path:path>')
def catch_all(path):
    print("PATH IS: " + str(path))
    return send_from_directory("", path)


def persistence():
    # make the stuff persistent
    pass


PICTURES, _ = add_image(PICTURES, "Starsinthesky.jpg")
PICTURES, _ = add_image(PICTURES, "Starsinthesky.jpg")
print(PICTURES)
app.run(port=PORT)
