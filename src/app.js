import {
    mount,
    createVNode,
    createDOMNode,
    patchNode
} from "./vdom.js";

const createVApp = state => {
    const {
        count
    } = state;
    return createVNode("div", {
        class: "container",
        "data-count": count
    }, [
        createVNode("h1", {}, ["Hello, Virtual DOM"]),
        createVNode("div", {}, [`Count: ${count}`]),
        "Text node without tags",
        createVNode("img", {
            src: "https://i.ibb.co/M6LdN5m/2.png",
            width: 400
        }),
        createVNode("div", {
            class: "buttons-container"
        }, [
            createVNode("button", {
                id: "decrease-button"
            }, [
                "-"
            ]),
            createVNode("button", {
                id: "increase-button"
            }, [
                "+"
            ])
        ])
    ]);
};

const state = {
    count: 0
};
const appContainer = document.getElementById("app");
let vApp = createVApp(state);
let app = mount(createDOMNode(vApp), appContainer);

let decreaseButton = document.getElementById("decrease-button");
if (decreaseButton) {
    decreaseButton.addEventListener("click", () => {
        state.count--;
        update(state);
    })
}

let increaseButton = document.getElementById("increase-button");
if (increaseButton) {
    increaseButton.addEventListener("click", () => {
        state.count++;
        update(state);
    })
}

const update = (state) => {
    const nextVApp = createVApp(state);
    app = patchNode(app, vApp, nextVApp);
    vApp = nextVApp;
}