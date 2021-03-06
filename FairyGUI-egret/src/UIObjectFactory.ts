
module fairygui {

    export class UIObjectFactory {
        public static packageItemExtensions: any = {};
        private static loaderExtension: any;

        public constructor() {
        }

        public static setPackageItemExtension(url: string, type: any): void {
            UIObjectFactory.packageItemExtensions[url.substring(5)] = type;
        }

        public static setLoaderExtension(type: any): void {
            UIObjectFactory.loaderExtension = type;
        }

        public static newObject(pi:PackageItem): GObject {
            switch (pi.type) {
                case PackageItemType.Image:
                    return new GImage();

                case PackageItemType.MovieClip:
                    return new GMovieClip();

                case PackageItemType.Component:
                    {
                        var cls:any = UIObjectFactory.packageItemExtensions[pi.owner.id + pi.id];
                        if(cls) 
                            return new cls();                        

                        var xml: any = pi.owner.getItemAsset(pi);
                        var extention: string = xml.attributes.extention;
                        if(extention != null) {
                            switch(extention) {
                                case "Button":
                                    return new GButton();

                                case "Label":
                                    return new GLabel();

                                case "ProgressBar":
                                    return new GProgressBar();

                                case "Slider":
                                    return new GSlider();

                                case "ScrollBar":
                                    return new GScrollBar();

                                case "ComboBox":
                                    return new GComboBox();

                                default:
                                    return new GComponent();
                            }
                        }
                        else
                            return new GComponent();
                    }
            }
            return null;
        }

        public static newObject2(type: string): GObject {
            switch (type) {
                case "image":
                    return new GImage();

                case "movieclip":
                    return new GMovieClip();

                case "component":
                    return new GComponent();

                case "text":
                    return new GTextField();

                case "richtext":
                    return new GRichTextField();

                case "inputtext":
                    return new GTextInput();

                case "group":
                    return new GGroup();

                case "list":
                    return new GList();

                case "graph":
                    return new GGraph();

                case "loader":
                    if (UIObjectFactory.loaderExtension != null)
                        return new UIObjectFactory.loaderExtension();
                    else
                        return new GLoader();
            }
            return null;
        }
    }
}