// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {

    var html = '';
    var node = document_root.firstChild;
    var item = document_root.getElementsByClassName("ic-truncate item-clickable");
   
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
         // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }


    var num_matches = html.match(/div class="ic-truncate item-clickable/gi).length;
    var items='';
    var pos = 0
    var pos2 = 0
    var index = 'div class="ic-truncate item-clickable'
    var indexEnd = 'div'
    var array = [];
    for (i = 0; i < num_matches; i++) { 

        pos = html.indexOf(index)+index.length
        html = html.substring(pos,html.length)
        pos2 = html.indexOf(indexEnd)
        content = html.substring(0,pos2)
        items+= content.substring(2, content.length-2)+ '\n'
        array.push(content.substring(2, content.length-2))
        posEnd = pos2 +4
        html = html.substring(posEnd,html.length)
        
    }


  //  d3.csv("baseFoodPrint.csv", function(data) {
 // console.log(data[0]);
  //  });

    return items;


 //   return html;
  
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)

});



