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
            patchProp(app, key, nextVProps[key]);
        }
    })
}

const patchProp = (app, key, nextPropValue) => {
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
