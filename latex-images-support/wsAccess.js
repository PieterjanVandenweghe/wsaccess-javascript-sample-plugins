function applicationStarted(pluginWorkspaceAccess) {
    Packages.java.lang.System.err.println("Application started " + pluginWorkspaceAccess);
    imageHandler = {
        canHandle: function (a, b, c) {
        },
        canHandleNamespace: function (ns) {
            return false;
        },
        canHandleNodeContext: function (nodeContext) {
            return "latex" == nodeContext.getNodeName() || ("foreign" == nodeContext.getNodeName() && "embed-latex" == nodeContext.getAttributeValue("outputclass"));
        },
        editImage: function (editContext) {
            jta = new Packages.javax.swing.JTextArea(editContext.getImageSerializedContent());
            scrollPane = new Packages.javax.swing.JScrollPane(jta);
            scrollPane.setPreferredSize(new Packages.java.awt.Dimension(500, 300));
            result = Packages.javax.swing.JOptionPane.showConfirmDialog(null, scrollPane,
                "Edit Latex Equation", Packages.javax.swing.JOptionPane.OK_CANCEL_OPTION,
                Packages.javax.swing.JOptionPane.PLAIN_MESSAGE);
            if (result == Packages.javax.swing.JOptionPane.YES_OPTION) {
                return jta.getText();
            } else {
                return null;
            }
        },
        canHandleFileType: function (type) {
            return "latex" == type || "tex" == type;
        },
        clearCache: function () {
        },
        getImageLayoutInformation: function (cp, rc) {
            image = getLatexImage(pluginWorkspaceAccess, cp, rc);
            return new Packages.ro.sync.exml.workspace.api.images.handlers.ImageLayoutInformation(0, 0, image.getWidth(null), image.getHeight(null));
        },
        getImage: function (cp, rc) {
            return getLatexImage(pluginWorkspaceAccess, cp, rc);
        }
    }
    pluginWorkspaceAccess.getImageUtilities().addImageHandler(new JavaAdapter(Packages.ro.sync.exml.workspace.api.images.handlers.XMLImageHandler, imageHandler));
}

function getLatexImage(pluginWorkspaceAccess, cp, rc) {
    latexContent = cp.getImageSerializedContent();
    latexContent = pluginWorkspaceAccess.getXMLUtilAccess().unescapeAttributeValue(latexContent.substring(latexContent.indexOf(">") + 1, latexContent.lastIndexOf("<")));
    formula = new Packages.org.scilab.forge.jlatexmath.TeXFormula(latexContent);
    return formula.createBufferedImage(Packages.org.scilab.forge.jlatexmath.TeXConstants.STYLE_DISPLAY, 20, Packages.java.awt.Color.black, Packages.java.awt.Color.white);
}

function applicationClosing(pluginWorkspaceAccess) {
    Packages.java.lang.System.err.println("Application closing " + pluginWorkspaceAccess);
}
