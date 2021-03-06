function applicationStarted(pluginWorkspaceAccess) {
 Packages.java.lang.System.err.println("Application started " + pluginWorkspaceAccess);
 edChangedListener = {
  /*Called when a DITA Map is opened*/
  editorOpened: function (editorLocation) {
   Packages.java.lang.System.err.println("\nrunning " + editorLocation);
   /*Get the opened DITA Map*/
   editor = pluginWorkspaceAccess.getEditorAccess(editorLocation, Packages.ro.sync.exml.workspace.api.PluginWorkspace.DITA_MAPS_EDITING_AREA);
   ditaMapPage = editor.getCurrentPage();
   /*Add listener called when right click is performed in the DITA Maps manager view*/
   customizerObj = {
    customizePopUpMenu: function (popUp, ditaMapDocumentController) {
     Packages.java.lang.System.err.println("RIGHT CLICK" + popUp);
     tree = ditaMapPage.getDITAMapTreeComponent();
     refsList = new Packages.java.util.ArrayList();
     /*Selected tree path*/
     selPaths = tree.getSelectionPaths();
     if (selPaths != null && selPaths.length > 0) {
     /* Compute absolute references for all selected topic references. */
     for(i = 0; i < selPaths.length; i++){
      selectedElement = selPaths[i].getLastPathComponent();
      /*Reference attribute*/
      href = selectedElement.getAttribute("href");
      if (href != null) {
       try {
        /*Create absolute reference*/
        absoluteRef = new Packages.java.net.URL(selectedElement.getXMLBaseURL(), href.getValue());
        Packages.java.lang.System.err.println("Computed absolute reference " + absoluteRef);
        refsList.add(absoluteRef);
       }
       catch (e1) {
        Packages.java.lang.System.err.println(e1);
       }
      }
     }
     try {
        /*Create absolute reference*/
        mi = new Packages.javax.swing.JMenuItem("Run notepad");
        popUp.add(mi);
        actionPerfObj = {
         actionPerformed: function (e) {
          try {
            for(i = 0; i < refsList.size(); i++){
                Packages.java.lang.Runtime.getRuntime().exec("notepad.exe " + pluginWorkspaceAccess.getUtilAccess().locateFile(refsList.get(i)));
            }
          }
          catch (e1) {
           e1.printStackTrace();
          }
         }
        }
        mi.addActionListener(new JavaAdapter(Packages.java.awt.event.ActionListener, actionPerfObj));
       }
       catch (e1) {
        Packages.java.lang.System.err.println(e1);
       }
     }
    }
   }
   
   ditaMapPage.setPopUpMenuCustomizer(new Packages.ro.sync.exml.workspace.api.editor.page.ditamap.DITAMapPopupMenuCustomizer(customizerObj));
  }
 }
 edChangedListener = new JavaAdapter(Packages.ro.sync.exml.workspace.api.listeners.WSEditorChangeListener, edChangedListener);
 pluginWorkspaceAccess.addEditorChangeListener(
 edChangedListener,
 Packages.ro.sync.exml.workspace.api.PluginWorkspace.DITA_MAPS_EDITING_AREA);
}

function applicationClosing(pluginWorkspaceAccess) {
 Packages.java.lang.System.err.println("Application closing " + pluginWorkspaceAccess);
}
