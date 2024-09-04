export const createVNode = (element, props = {}, children = []) => {
    return {
        element,
        props,
        children
    }
}

export const createDOMNode = vNode => {
    if (typeof vNode === "string") {
        return document.createTextNode(vNode)
    }
    const {
        element,
        props,
        children
    } = vNode;
    const node = document.createElement(element);
    patchProps(node, {}, props);
    children.forEach(child => {
        node.appendChild(createDOMNode(child))
    })
    return node;
}

export const mount = (node, target) => {
    target.innerHTML = "";
    target.appendChild(node);
    return node;
}

export const patchNode = (app, vApp, nextVApp) => {
    if (nextVApp === undefined) {
        vApp.remove();
        return;
    }
    if (typeof vApp === "string" || typeof nextVApp === "string") {
        if (vApp !== nextVApp) {
            const nextNode = createDOMNode(nextVApp);
            app.replaceWith(nextNode);
            return nextNode;
        }
        return app;
    }
    if (vApp.tagName !== nextVApp.tagName) {
        const nextNode = createDOMNode(nextVApp);
        app.replaceWith(nextNode);
        return nextNode;
    }
    patchProps(app, vApp.props, nextVApp.props);
    patchChildren(app, vApp.children, nextVApp.children);
    return app;
}

const patchProps = (app, vProps, nextVProps) => {
    const mergedProps = {
        ...vProps,
        ...nextVProps
    };
    Object.keys(mergedProps).forEach((key) => {
        if (vProps[key] !== nextVProps[key]) {
            patchProp(app, key, vProps[key], nextVProps[key]);
        }
    })
}

const patchProp = (app, key, propValue, nextPropValue) => {
    if (key.startsWith("on")) {
        const eventName = key.slice(2);

        app[eventName] = nextPropValue;

        if (!nextPropValue) {
            app.removeEventListener(eventName, listener);
        } else if (!propValue) {
            app.addEventListener(eventName, listener);
        }
        return;
    }
    if (nextPropValue == null || nextPropValue === false) {
        app.removeAttribute(key);
        return;
    };
    app.setAttribute(key, nextPropValue);
}

const patchChildren = (parent, vChildren, nextVChildren) => {
    parent.childNodes.forEach((child, i) => {
        patchNode(child, vChildren[i], nextVChildren[i]);
    });
    nextVChildren.slice(vChildren.length).forEach((newBornVChild) => {
        parent.appendChild(createDOMNode(newBornVChild));
    });
}

export const patch = (nextVNode, node) => {
    const vNode = node.v || recycleNode(node);
    node = patchNode(node, vNode, nextVNode);
    node.v = nextVNode;
    return node;
};

const TEXT_NODE_TYPE = 3;

const recycleNode = node => {
    if (node.nodeType === TEXT_NODE_TYPE) {
        return node.nodeValue;
    }
    const tagName = node.nodeName.toLowerCase();
    const children = [].map.call(node.childNodes, recycleNode);
    return createVNode(tagName, {}, children);
};

function listener(event) {
    return this[event.type](event);
}