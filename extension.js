const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Gettext = imports.gettext;
const _ = Gettext.domain('win-key-for-help').gettext;

let text, button;

let _keyBindingPressed;
let _keyBindingReleased;
let col;
let row;


function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: "Hello, world!" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
                      Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

function init() {
    Convenience.initTranslations();
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
}

function dumpObject(obj, indent)
{
  var result = "";
  if (indent == null) indent = "";

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        // Just let JS convert the Array to a string!
        value = "[ " + value + " ]";
      }
      else
      {
        // Recursive dump
        // (replace "  " by "\t" or something else if you prefer)
        var od = dumpObject(value, indent + "  ");
        // If you like { on the same line as the key
        //value = "{\n" + od + "\n" + indent + "}";
        // If you prefer { and } to be aligned
        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
      }
    }
    result += indent + "'" + property + "' : " + value + ",\n";
  }
  return result.replace(/,\n$/, "");
}

function table() {

    if(col%2 == 0) {
        col++;
    }
    else {
        row++;
        col--;
    }
}


function pressed() {
    //print(dumpObject(arguments));
    print("Pressed!");

if (!text) {
    text=new St.Table({style_class: 'table', homogeneous: false});

    let first=new St.Table({style_class: 'column', homogeneous: false});
    let window=new St.Table({style_class: 'column', homogeneous: false});
    let application=new St.Table({style_class: 'column small', homogeneous: false});
    let usefulness=new St.Table({style_class: 'column small', homogeneous: false});
    let right=new St.Table({style_class: 'column',homogeneous: false});
    let left=new St.Table({homogeneous: false});

    //-----------------------------------------------------------------

    window.add(new St.Label({style_class: 'header', text:_("Window management")}),
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    col = 0;
    row = 1;

    window.add(new St.Label({style_class: 'bold', text:"Win/Alt +Tab"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Switch to next application")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:"Win/Alt+Shift+Tab"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Switch to previous application")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:_("Win/Alt+<key above tab>")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Next window of active application")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:_("Win/Alt+Shift+<key above tab>")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Previous window of active application")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: "Win+D"}),
              {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Show desktop (minimize all windows)")}),
              {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: "Win+Home"}),
              {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Hide all windows except the active one")}),
              {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:"Win+M"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Toggle Message Tray")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: _("Win+Shift+Top")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Expand the maximum window vertically")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: _("Win+Left/Right")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("To left/right part of Desktop")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();





    window.add(new St.Label({style_class: 'bold', text:"Win+H"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Hide window")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: _("Win+Shift+Left/Right")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Redirect the window to a nearby monitor")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text: "Win+P"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Switching between 'projector'")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:_("Ctrl+Alt+Down/Up")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Switch to next/previous workspace")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'bold', text:"Win+L"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    window.add(new St.Label({style_class: 'label', text: _("Lock computer")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();

   //-----------------------------------------------------------------


    application.add(new St.Label({style_class: 'header', text:_("Launching applications")}),
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    col = 0;
    row = 1;
    application.add(new St.Label({style_class: 'label', text:"Win+R, Alt+F2"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("Run Console")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text:"Win+A"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("Enter \"Show Applications\"")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: "Win+E"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("Run the file browser (Nautilus)")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: "Win+F"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("Open Search")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: "Win+Pause"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("System Properties (Control Center)")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: "Ctrl+Shift+Esc"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    application.add(new St.Label({style_class: 'label', text: _("Open Task Manager")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();

    //-----------------------------------------------------------------


    usefulness.add(new St.Label({style_class: 'header', text:_("Usefulness")}),
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    col = 0;
    row = 1;

    usefulness.add(new St.Label({style_class: 'label', text:"Win+Space"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Switch input source")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text:"PrintScreen"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Take a screenshot")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text:"Ctrl+Alt+Shift+R"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Video capture desktop")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text:"Ctrl+Alt+Tab"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Switch focus in overview")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text:"Win+F10"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Access Application Menu")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text:"Ctrl+1"}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();
    usefulness.add(new St.Label({style_class: 'label', text: _("Toggle zoom and drawing on screen")}),
             {row: row, col: col, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });table();



    //-----------------------------------------------------------------
    right.add(application,
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    right.add(usefulness,
             {row: 1, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.END, y_align: St.Align.END });

    first.add(new St.Label({style_class: 'bold big', text:_("Win, Alt+F1 - Overview")}),
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });

    left.add(first,
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    left.add(window,
             {row: 1, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });

    text.add(left,
             {row: 0, col: 0, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });
    text.add(right,
             {row: 0, col: 1, expand: true, x_fill: true, y_fill: true, x_align: St.Align.START, y_align: St.Align.START });



    Main.uiGroup.add_actor(text);
}

    let monitor = Main.layoutManager.primaryMonitor;

    //correct font-size
    let font_size = 24;
    while(monitor.width < text.width || monitor.height < text.height) {
        font_size--;
        text.set_style("font-size: "+font_size+"px");
    }

    text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
                      Math.floor(monitor.height / 2 - text.height / 2));

    return true;
}

function destroy() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function released() {
    print("Released!");

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 1,
                       transition: 'easeOutQuad',
                       onComplete: destroy });

    return true;
}

function enable() {
    //Main.panel._rightBox.insert_child_at_index(button, 0);

    _keyBindingPressed = global.display.connect('overlay-key-hold', pressed);
    _keyBindingReleased = global.display.connect('overlay-key-hold-released', released);
}

function disable() {
    //Main.panel._rightBox.remove_child(button);

    global.display.disconnect(_keyBindingReleased);
    global.display.disconnect(_keyBindingPressed);
}
