export default function() {
    return {
        visitor: {
            // Visitor 中的每个函数接收2个参数：path 和 state
            Identifier(path, state) {
                const name = path.node.name;
                // reverse the name: JavaScript -> tpircSavaJ
                // path.node.name = name
                //     .split('')
                //     .reverse()
                //     .join('');
            },
            ImportDeclaration(path, state) {
                console.log(path.node);
            }
        }
    };
}
