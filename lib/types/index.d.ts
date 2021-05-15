/**
 * Defines classes, types, and global functions related to CAD Exchanger Web SDK.
 */
declare namespace cadex {
    /**
     * Predefined list of angle units.
     */
    enum Base_AngleUnit {
        Base_AU_Radians = 0,
        Base_AU_Degrees = 1
    }
    class Base_Helper {
        static unitSymbol(theUnit: Base_AngleUnit | Base_LengthUnit, theAngle?: boolean): string;
        static convertLengthTypes(theValue: number, theConvertToType: Base_LengthUnit): number;
        static convertAngelsTypes(theValue: number, theConvertToType: Base_AngleUnit): number;
    }
    /**
     * Predefined list of lenght units.
     */
    enum Base_LengthUnit {
        Base_LU_Millimeters = 0,
        Base_LU_Centimeters = 1,
        Base_LU_Meters = 2,
        Base_LU_Inches = 3,
        Base_LU_Feets = 4,
        Base_LU_Yards = 5,
        Base_LU_Micrometers = 6,
        Base_LU_Decimeters = 7,
        Base_LU_Kilometers = 8,
        Base_LU_Mils = 9,
        Base_LU_Miles = 10
    }
    /**
     * Creates an instance of Uuid.
     * @param [theData] - 16 bytes or string which represent UUID.
     * Undefined value initializes as null UUID {00000000-0000-0000-0000-000000000000}.
     */
    class Base_Uuid {
        constructor(theData?: number[] | string);
        /**
         * Returns true if this is the null UUID {00000000-0000-0000-0000-000000000000}, otherwise returns false.
         */
        isNull(): boolean;
        /**
         * Creates copy of the current object.
         */
        clone(): Base_Uuid;
        /**
         * Copy uuid data from another one.
         * @param theUuid - The uuid to copy from.
         * @returns Current object.
         */
        copy(theUuid: Base_Uuid): Base_Uuid;
        toString(): string;
    }
    /**
     * Creates an instance of ModelAlgo_ThreejsConverter.
     * @param theParameters - The converter parameters.
     */
    class ModelAlgo_ThreejsConverter {
        constructor(theParameters: ModelAlgo_ThreejsConverterParameters);
        /**
         * Converter parameters.
         */
        parameters: cadex.ModelAlgo_ThreejsConverterParameters;
        /**
         * Converts whole model into graph of [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) objects.
         * If model empty, empty [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) will be returned.
         */
        convertModel(theModel: cadex.ModelData_Model): Promise<THREE.Object3D>;
        /**
         * Converts [scene graph element]{@link cadex.ModelData_SceneGraphElement} into corresponding graph
         * of [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) objects.
         */
        convertSceneGraphElement(theSGE: cadex.ModelData_SceneGraphElement): Promise<THREE.Object3D | undefined>;
        /**
         * Converts [poly vertex set]{@link cadex.ModelData_PolyVertexSet} to corresponding
         * [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) object (
         * [THREE.Mesh](https://threejs.org/docs/#api/en/objects/Mesh),
         * [THREE.Line](https://threejs.org/docs/#api/en/objects/Line) or
         * [THREE.Points](https://threejs.org/docs/#api/en/objects/Points)).
         *
         * __Note__: Texture conversions are not supported.
         */
        convertPolyVertexSet(thePart: cadex.ModelData_PolyVertexSet): THREE.Object3D | undefined;
    }
    /**
     * Creates an instance of ModelAlgo_ThreejsConverterParameters.
     */
    class ModelAlgo_ThreejsConverterParameters {
        /**
         * Representation to convert. Defaults to [ModelData_RM_Any]{@link cadex.ModelData_RepresentationMask} mask selector.
         */
        representationSelector: cadex.ModelData_RepresentationSelector;
        /**
         * Appearance for {@link cadex.ModelData_PolyVertexSet PolyVertexSets} which have no appearance.
         * Default is #808080 color (<span style="background:#808080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>).
         */
        defaultAppearance: cadex.ModelData_Appearance;
    }
    /**
     * Computes validation properties of the objects.
     */
    class ModelAlgo_ValidationProperty {
        /**
         * Method for calculating surface area of list of visual objects.
         */
        static computeSurfaceArea(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject): number;
    }
    /**
     * Creates an instance of Appearance.
     * @param [theObject] - Generic color or material.
     */
    class ModelData_Appearance extends ModelData_BaseObject {
        constructor(theObject?: ModelData_ColorObject | ModelData_MaterialObject);
        /**
         * Generic color assigned to appearance.
         */
        genericColor: ModelData_ColorObject;
        /**
         * Material object assigned to appearance.
         */
        material: ModelData_MaterialObject;
        /**
         * Texture set assigned to appearance.
         */
        textureSet: ModelData_TextureSet;
        /**
         * Updates appearance.
         * @param [theObject] - Generic color or material.
         */
        set(theObject?: ModelData_ColorObject | ModelData_MaterialObject): void;
        /**
         * Adds texture to the appearance.
         */
        add(theTexture: ModelData_Texture): void;
        /**
         * Returns true if there is any style item which allows to retrieve a color.
         *
         * If there is a {@link cadex.ModelData_Appearance#genericColor genericColor} then theColor will be assigned its value.
         * Otherwise, if there is a {@link cadex.ModelData_Appearance#material material} then theColor will be assigned its diffuse color value.
         *
         * Otherwise returns false.
         * @param theColor - Color object to copy to
         * @returns true if there is any style item which allows to retrieve a color. Otherwise returns false.
         */
        toColor(theColor: ModelData_ColorObject): boolean;
        /**
         * Returns true if there is any style item which allows to convert this appearance to a material.
         *
         * If there is a {@link cadex.ModelData_Appearance#material material} then theMaterial will be assigned its value.
         * If there is a {@link cadex.ModelData_Appearance#genericColor genericColor} then theMaterial will have diffuse color of that value and other default colors will have default values.
         *
         * Otherwise returns false.
         * @param theMaterial - Material
         * @returns true if there is any style item which allows to convert this appearance to a material. Otherwise returns false.
         */
        toMaterial(theMaterial: ModelData_MaterialObject): boolean;
        /**
         * Combine appearance with current.
         * @param theAppearance - The appearance to combine with.
         * @returns Current object.
         */
        combineWith(theAppearance: ModelData_Appearance): ModelData_Appearance;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_Appearance;
        /**
         * Copy appearance params from another appearance.
         * @param theAppearance - The appearance to copy from.
         * @returns Current object.
         */
        copy(theAppearance: ModelData_Appearance): ModelData_Appearance;
    }
    /**
     * Creates an instance of ModelData_Assembly.
     */
    class ModelData_Assembly extends ModelData_SceneGraphElement {
        children: ModelData_SceneGraphElement[];
        /**
         * Adds a new child element into the assembly.
         * Assemblies may only have instances as direct children. If theElement is not an instance (i.e. is a part
         * or an assembly) then an interim instance is created which will refer to theElement.
         * @param theElement - Scene graph element to add.
         * @param [theTransformation] - The transformation to be added to the created Instance
         * @param [theName] - The name to be added to the created Instance
         * @returns If theElement is an instance then return it, otherwise returns a newly created instance.
         */
        addInstance(theElement: ModelData_Instance | ModelData_Part | ModelData_Assembly, theTransformation?: ModelData_Transformation, theName?: string): ModelData_Instance;
        accept(theVisitor: ModelData_SceneGraphElementVisitor): Promise<void>;
    }
    /**
     * Creates an axis from origin point and direction.
     */
    class ModelData_Axis1Placement {
        constructor(theLocation?: ModelData_Point, theDirection?: ModelData_Direction);
        /**
         * Location point of the axis placement.
         */
        readonly location: ModelData_Point;
        /**
         * Direction of the axis placement.
         */
        readonly direction: ModelData_Direction;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_Axis1Placement;
        /**
         * Copy axis params from another axis.
         * @param theAxis - The axis to copy from.
         * @returns Current object.
         */
        copy(theAxis: ModelData_Axis1Placement): ModelData_Axis1Placement;
    }
    /**
     * Creates an axis from origin point, direction and a referenced direction.
     */
    class ModelData_Axis2Placement {
        constructor(theLocation: ModelData_Point, theDirection: ModelData_Direction, theRefDirection: ModelData_Direction);
        /**
         * Location point of the axis placement.
         */
        readonly location: ModelData_Point;
        /**
         * Z-direction of the axis placement.
         */
        readonly axis: ModelData_Direction;
        /**
         * X-direction of the axis placement.
         */
        readonly xDirection: ModelData_Direction;
        /**
         * Y-direction of the axis placement.
         */
        readonly yDirection: ModelData_Direction;
    }
    /**
     * Creates an axis from origin point, direction and a referenced direction.
     */
    class ModelData_Axis3Placement {
        constructor(theLocation?: ModelData_Point, theDirection?: ModelData_Direction, theRefDirection?: ModelData_Direction);
        /**
         * Location point of the axis placement.
         */
        readonly location: ModelData_Point;
        /**
         * Z-direction of the axis placement.
         */
        readonly axis: ModelData_Direction;
        /**
         * X-direction of the axis placement.
         */
        readonly xDirection: ModelData_Direction;
        /**
         * Y-direction of the axis placement.
         */
        readonly yDirection: ModelData_Direction;
        clone(): ModelData_Axis3Placement;
        /**
         * @returns Current object
         */
        copy(theAx3: ModelData_Axis3Placement): ModelData_Axis3Placement;
    }
    /**
     * Provides {@link cadex.ModelData_BRepRepresentation B-Rep representation}.
     *
     * Used to defer construction of the B-Rep representation and thereby to reduce peak memory footprint.
     */
    class ModelData_BRepRepresentationProvider {
        /**
         * Feeds the representation.
         * This method can depend of the network request which makes asynchronously, so it should return Promise.
         * Subclasses must redefine this method to call {@link cadex.ModelData_BRepRepresentation#add add()}
         * of theRepresentation.
         * @param theRepresentation - The representation to feed.
         * @returns Resolved promise if representation has been feeded successfully.
         */
        feed(theRepresentation: ModelData_BRepRepresentation): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_BRepRepresentation.
     * @param [theBody] - The body to be constructed from.
     */
    class ModelData_BRepRepresentation extends ModelData_Representation {
        constructor(theBody?: ModelData_Body);
        /**
         * Reference to [Provider]{@link cadex.ModelData_BRepRepresentationProvider} class.
         */
        static readonly Provider: any;
        /**
         * Adds a root body.
         * @param theBody - The body to add.
         */
        add(theBody: ModelData_Body): void;
        /**
         * Add BRep representations provider.
         * @param theProvider - The provider to add.
         */
        addProvider(theProvider: ModelData_BRepRepresentationProvider): void;
        /**
         * Returns bodies list. This method flushes providers.
         */
        bodyList(): Promise<ModelData_BodyList>;
        accept(theVisitor: ModelData_RepresentationVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_BaseObject.
     */
    class ModelData_BaseObject {
        constructor(theName?: string, theUuid?: Base_Uuid);
        /**
         * Object name. null if the object has no name (by default).
         */
        name: string;
        /**
         * Object name. null if the object has no name (by default).
         */
        uuid: Base_Uuid;
    }
    /**
     * Creates an instance of ModelData_Body.
     */
    class ModelData_Body extends ModelData_Shape {
        /**
         * Body type.
         */
        readonly bodyType: ModelData_BodyType;
    }
    /**
     * Defines a list of bodies.
     * Body list is used by ModelData_BRepRepresentation to hold root bodies.
     */
    class ModelData_BodyList extends ModelData_Shape {
        /**
         * Adds body to the body list.
         * @param theBody - The body to add.
         */
        append(theBody: ModelData_Body): void;
        /**
         * Returns the number of added bodies
         */
        size(): number;
        /**
         * Retrieve body by index.
         * @param theIndex - Must be in the range [0, size() - 1]. Otherwise the result is undefined.
         */
        element(theIndex: number): ModelData_Body;
    }
    /**
     * Defines a body type.
     */
    enum ModelData_BodyType {
        /**
         * Unknown body type
         */
        Undefined = 0,
        /**
         * Acorn body type
         */
        Acorn = 1,
        /**
         * Wireframe body type
         */
        Wireframe = 2,
        /**
         * Sheet body type
         */
        Sheet = 3,
        /**
         * Solid body type
         */
        Solid = 4
    }
    /**
     * Creates a box with specified minimum and maximum corners.
     * @param [theMinCorner] - Min corner
     * @param [theMaxCorner] - Max corner
     */
    class ModelData_Box {
        constructor(theMinCorner?: ModelData_XYZ, theMaxCorner?: ModelData_XYZ);
        minCorner: ModelData_Point;
        maxCorner: ModelData_Point;
        /**
         * Copy values from another point
         * @param theBox - Box to copy from
         */
        copy(theBox: ModelData_Box | any): void;
        /**
         * Accumulates another bounding box or point.
         * @param theObject - The object to add
         */
        add(theObject: ModelData_Point | ModelData_Box | any): void;
        /**
         * Returns true if at least one coordinate is infinite.
         */
        isInfinite(): boolean;
        /**
         * Resets the bounding box.
         */
        clear(): void;
        toString(): string;
    }
    /**
     * Creates an instance of ModelData_Color. Each value must be within [0, 1] range.
     * @param [r = 0.0] - Red value
     * @param [g = 0.0] - Green value
     * @param [b = 0.0] - Blue value
     * @param [a = 1.0] - Alpha value
     */
    class ModelData_ColorObject extends ModelData_BaseObject {
        constructor(r?: number, g?: number, b?: number, a?: number);
        /**
         * Red component of the color. Value must be within [0, 1] range.
         */
        r: number;
        /**
         * Green component of the color. Value must be within [0, 1] range.
         */
        g: number;
        /**
         * Blue component of the color. Value must be within [0, 1] range.
         */
        b: number;
        /**
         * Alpha component of the color. Value must be within [0, 1] range.
         */
        a: number;
        /**
         * Return component value by index.
         * @param theIndex - Index of the component. Must be in the [0, 4] range.
         */
        value(theIndex: number): number;
        /**
         * Change component value by index.
         * @param theIndex - Index of the component. Must be in the [0, 4] range.
         * @param theValue - Value of the component. Must be within [0, 1] range.
         */
        setValue(theIndex: number, theValue: number): void;
        /**
         * Set color components.
         * @param [r = 0.0] - Red value
         * @param [g = 0.0] - Green value
         * @param [b = 0.0] - Blue value
         * @param [a = 1.0] - Alpha value
         */
        set(r?: number, g?: number, b?: number, a?: number): void;
        /**
         * Set color from integer which represents RGB. Alpha component will not be changed.
         * @param theHex - The hex color.
         */
        setHex(theHex: number): void;
        /**
         * Creates color from integer which represents RGB.
         * @param theHex - The hex color.
         */
        static fromHex(theHex: number): ModelData_ColorObject;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_ColorObject;
        /**
         * Copy values from another color to current.
         * @param theColor - The color to copy from.
         * @returns Current object.
         */
        copy(theColor: ModelData_ColorObject): ModelData_ColorObject;
        toString(): string;
    }
    /**
     * Provides combined methods VisitElementEnter() and VisitElementLeave() to visit all elements.
     * This visitor is opposed to the C++ [ModelData_Model::CombinedElementVisitor]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___model_1_1_combined_element_visitor.html} class.
     * This class can be also accessed as {@link cadex.ModelData_Model.CombinedElementVisitor ModelData_Model.CombinedElementVisitor}.
     */
    class ModelData_CombinedSceneGraphElementVisitor {
        visitElementEnter(theElement: ModelData_SceneGraphElement): Promise<boolean> | boolean;
        visitElementLeave(theElement: ModelData_SceneGraphElement): Promise<void> | void;
        visitPart(thePart: ModelData_Part): Promise<void> | void;
        visitInstanceEnter(theInstance: ModelData_Instance): Promise<boolean> | boolean;
        visitInstanceLeave(theInstance: ModelData_Instance): Promise<void> | void;
        visitAssemblyEnter(theAssembly: ModelData_Assembly): Promise<boolean> | boolean;
        visitAssemblyLeave(theAssembly: ModelData_Assembly): Promise<void> | void;
    }
    /**
     * Creates Direction of object or three numbers.
     */
    class ModelData_Direction {
        constructor(x?: number, y?: number, z?: number);
        /**
         * X coord.
         */
        x: number;
        /**
         * Y coord.
         */
        y: number;
        /**
         * Z coord.
         */
        z: number;
        /**
         * Sets coordinates.
         * @param x - X coord
         * @param y - Y coord
         * @param z - Z coord
         */
        setCoord(x: number, y: number, z: number): void;
        /**
         * Transforms the point with a transformation matrix.
         * @returns Current object
         */
        transform(theTransformation: ModelData_Transformation): ModelData_Direction;
        /**
         * Returns a new point which is transformed with a transformation matrix.
         */
        transformed(theTransformation: ModelData_Transformation): ModelData_Direction;
        /**
         * Makes cross product with another direction.
         * @returns Current object
         */
        cross(theDirection: ModelData_Direction): ModelData_Direction;
        /**
         * Makes cross product vector from current vector and with another one.
         */
        crossed(theDirection: ModelData_Direction): ModelData_Direction;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_Direction;
        /**
         * Copy values from another direction.
         * @param theDirection - The direction to copy from.
         * @returns Current object.
         */
        copy(theDirection: ModelData_XYZ): ModelData_Direction;
        toString(): string;
    }
    /**
     * Creates an instance of ModelData_Edge.
     * @param [thePrs] - The shape poly presentation.
     */
    class ModelData_Edge extends ModelData_Shape {
        constructor(thePrs?: ModelData_ShapePrs);
    }
    /**
     * Base class for elementary surfaces.
     *
     * Elementary surface has an axis placement returned by Position().
     */
    class ModelData_ElementarySurface {
        constructor(thePlacement: ModelData_Axis3Placement);
        /**
         * Location point of the axis placement.
         */
        readonly location: ModelData_Point;
        /**
         * Z-direction of the axis placement.
         */
        readonly direction: ModelData_Direction;
        /**
         * Surface axis
         */
        readonly position: ModelData_Axis3Placement;
    }
    /**
     * Used to defer loading of image of the file texture.
     */
    class ModelData_FileTextureProvider {
        /**
         * @returns Resolved promise if texture image has been load successfully.
         */
        feed(theFileTexture: ModelData_FileTexture): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_FileTexture.
     */
    class ModelData_FileTexture {
        constructor(theFilePath: string, theTextureType?: number, theTextureParameters?: ModelData_TextureParameters);
        /**
         * Reference to [Provider]{@link cadex.ModelData_FileTextureImageProvider} class.
         */
        static readonly Provider: any;
        /**
         * A file path to the file.
         */
        filePath: string;
        /**
         * Returns image. This method flushes provider.
         * Note: the file path should be relative of the model scenegraph location.
         */
        image(): Promise<HTMLImageElement>;
        set(theImage: HTMLImageElement): void;
        accept(theVisitor: ModelData_TextureVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_IndexedPolyLineSet.
     */
    class ModelData_IndexedPolyLineSet extends ModelData_PolyLineSet {
        /**
         * Indexes array.
         */
        readonly indexes: Uint32Array | undefined;
    }
    /**
     * Creates an instance of ModelData_IndexedTriangleSet.
     */
    class ModelData_IndexedTriangleSet extends ModelData_PolyVertexSet {
        /**
         * Indexes array.
         */
        readonly indexes: Uint32Array | undefined;
        /**
         * Normals array.
         */
        readonly normals: Float32Array | undefined;
        /**
         * Returns a number of faces (triangles).
         */
        numberOfFaces(): number;
        /**
         * Returns a number of normals.
         */
        numberOfNormals(): number;
        /**
         * Returns a number of UV coordinates.
         */
        numberOfUVCoordinates(): number;
        /**
         * Returns a coordinate index for a vertex in a face.
         * @param theFace - The face number.
         * @param theVertexSlot - The vertex number in face.
         */
        coordinateIndex(theFace: number, theVertexSlot: number): number;
        /**
         * Return true if object has normal per vertex
         */
        hasNormals(): boolean;
        /**
         * Returns a normal per its index.
         * Note: changing returned object does not change original normal.
         * @param theIndex - The normal index.
         */
        normal(theIndex: number): ModelData_Direction | undefined;
        /**
         * Returns a normal index for a vertex in a face.
         * @param theFace - The face number.
         * @param theVertexSlot - The vertex number in face.
         */
        normalIndex(theFace: number, theVertexSlot: number): number;
        /**
         * Return true if object has UV coordinates associated with vertices
         */
        hasUVCoordinates(): boolean;
        /**
         * Returns a UV coordinate associated with a vertex.
         * This method may only be used if HasUVCoordinates() returns true,
         * otherwise behavior is undefined.
         * Note: changing returned object does not change original UV point.
         * @param theIndex - The normal index.
         */
        uvCoordinate(theIndex: number): ModelData_Point2d | undefined;
        /**
         * Returns a UV coordinate index for a vertex in a face.
         * This method may only be used if HasUVCoordinates() returns true,
         * otherwise behavior is undefined.
         * @param theFace - The face number.
         * @param theVertexSlot - The vertex number in face.
         */
        uvCoordinateIndex(theFace: number, theVertexSlot: number): number;
    }
    /**
     * Creates an instance of ModelData_Instance.
     * @param [theElement] - Part or Assembly
     * @param [theTrsf] - The transformation of reference
     * @param [theName] - The name of the element
     */
    class ModelData_Instance extends ModelData_SceneGraphElement {
        constructor(theElement?: ModelData_Part | ModelData_Assembly, theTrsf?: ModelData_Transformation, theName?: string);
        /**
         * Referenced object.
         * Warning: there must be no cyclic references between theElement and this instance as otherwise there will
         * be memory leaks and infinite loop when visiting the scene graph.
         */
        reference: ModelData_SceneGraphElement | undefined;
        /**
         * The transformation of the reference. Set transformation property by making deep copy of target transformation.
         */
        transformation: ModelData_Transformation;
        accept(theVisitor: ModelData_SceneGraphElementVisitor): Promise<void>;
    }
    /**
     * 3D Point interface
     */
    interface ModelData_XYZ {
        x: number;
        y: number;
        z: number;
    }
    /**
     * 2D Point interface
     */
    interface ModelData_XY {
        x: number;
        y: number;
    }
    /**
     * Creates an instance of ModelData_MaterialObject.
     * @param [theAmbientColor] - Ambient color
     * @param [theDiffuseColor] - Diffuse color
     * @param [theSpecularColor] - Emissive color
     * @param [theEmissionColor] - Specular color
     * @param [theShininess = 1] - Shininess
     */
    class ModelData_MaterialObject extends ModelData_BaseObject {
        constructor(theAmbientColor?: ModelData_ColorObject, theDiffuseColor?: ModelData_ColorObject, theSpecularColor?: ModelData_ColorObject, theEmissionColor?: ModelData_ColorObject, theShininess?: number);
        /**
         * Ambient color.
         */
        static ambientColor: ModelData_ColorObject;
        /**
         * Diffuse color.
         */
        static diffuseColor: ModelData_ColorObject;
        /**
         * Specular color.
         */
        static specularColor: ModelData_ColorObject;
        /**
         * Emissive color.
         */
        static emissiveColor: ModelData_ColorObject;
        /**
         * Shininess value. Must be within [0, 128] range.
         */
        static shininess: number;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_MaterialObject;
        /**
         * Copy another material properties to current.
         * @param theMaterial - The material to copy.
         * @returns Current object.
         */
        copy(theMaterial: ModelData_MaterialObject): ModelData_MaterialObject;
    }
    /**
     * Creates an instance of ModelData_Model.
     * @param [theName] - The model name.
     */
    class ModelData_Model {
        constructor(theName?: string);
        /**
         * Reference to [ElementVisitor]{@link cadex.ModelData_SceneGraphElementVisitor} class.
         */
        static readonly ElementVisitor: any;
        /**
         * Reference to [CombinedElementVisitor]{@link cadex.ModelData_CombinedSceneGraphElementVisitor} class.
         */
        static readonly CombinedElementVisitor: any;
        /**
         * The model name. null if the model has no name (by default).
         */
        name: string;
        /**
         * Contains additional information about model.
         */
        meta: any;
        /**
         * Adds new root element into the scene graph.
         * @param theRoot - The root element.
         */
        addRoot(theRoot: ModelData_SceneGraphElement): void;
        /**
         * Returns number of root elements in the graph.
         */
        numberOfRoots(): number;
        /**
         * Return root element in the graph by index.
         * @param theIndex - The root index.
         */
        root(theIndex: number): ModelData_SceneGraphElement;
        /**
         * Loads model from model URL. All necessary data is requested via <code>dataProvider</code>.
         * @param theFilePath - The file path
         * @param dataProvider - The model data provider.
         * @param [theAppend = true] - Indicates append roots or not
         */
        loadFile(theFilePath: string, dataProvider: (...params: any[]) => any, theAppend?: boolean): Promise<{ hasBRepRep: boolean; polyRepCount: number; roots: ModelData_SceneGraphElement[]; }>;
        /**
         * Loads model from [ArrayBuffer]{@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}.
         * @param theFileId - The file identificator
         * @param theFileData - The array buffer which represents SceneGraph persistance.
         * @param refDataProvider - The external data provider.
         * @param [theAppend = true] - Indicates append roots or not
         */
        loadSceneGraph(theFileId: string, theFileData: ArrayBuffer, refDataProvider: (...params: any[]) => any, theAppend?: boolean): any;
        accept(theVisitor: ModelData_SceneGraphElementVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMICamera.
     */
    class ModelData_PMICamera extends ModelData_BaseObject {
        constructor(theLocation?: ModelData_Point, theTargetPoint?: ModelData_Point, theUpDirection?: ModelData_Direction, theName?: string);
        /**
         * Position of the camera.
         */
        location: ModelData_Point;
        /**
         * Point that the camera is looking at.
         */
        targetPoint: ModelData_Point;
        /**
         * "up" direction of the camera.
         */
        upDirection: ModelData_Direction;
    }
    /**
     * Creates an instance of ModelData_PMICompositeOutline.
     */
    class ModelData_PMICompositeOutline extends ModelData_PMIOutline {
        /**
         * Array of PMI outlines.
         */
        readonly outlines: ModelData_PMIOutline[];
        /**
         * Appends an outline.
         */
        append(theOutline: ModelData_PMIOutline): void;
        /**
         * Returns true if no outlines have been added
         */
        isEmpty(): boolean;
        /**
         * Returns number of added outlines.
         */
        numberOfOutlines(): number;
        /**
         * Returns a specified outline.
         */
        outline(theIndex: number): ModelData_PMIOutline | undefined;
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMICurve2dOutline.
     */
    class ModelData_PMICurve2dOutline extends ModelData_PMIOutline {
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMICurveOutline.
     */
    class ModelData_PMICurveOutline extends ModelData_PMIOutline {
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMIData.
     */
    class ModelData_PMIData extends ModelData_BaseObject {
        constructor(theType?: number, theName?: string);
        /**
         * PMI data type.
         */
        readonly type: number;
        /**
         * Graphical element.
         */
        graphicalElement: ModelData_PMIGraphicalElement;
        /**
         * Property table.
         */
        properties: ModelData_PropertyTable;
        /**
         * Adds a property table to the data.
         *
         * If this object did not have properties yet, then theProperties are just linked to this object.
         * Otherwise, the elements of theProperties are appended to existing property table (see
         * {@link cadex.ModelData_PropertyTable#add add()}).
         */
        addProperties(theProperties: ModelData_PropertyTable): void;
        /**
         * Returns true if no graphical element was set.
         */
        isEmpty(): boolean;
    }
    /**
     * Creates an instance of ModelData_PMIGraphicalElement.
     */
    class ModelData_PMIGraphicalElement extends ModelData_BaseObject {
        constructor(theName?: string);
        /**
         * Plane attached to.
         */
        readonly plane: ModelData_PMIPlane;
        /**
         * List of components.
         *
         * This method is opposed to the C++ [ModelData_PMIGraphicalElement::Accept()]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_saved_view.html} method
         * and [ModelData_PMIGraphicalElement::ComponentIterator]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_saved_view.html} class.
         */
        readonly components: ModelData_PMIGraphicalElementComponent[];
        /**
         * Adds a component.
         */
        addComponent(theComponent: ModelData_PMIGraphicalElementComponent): void;
        /**
         * Returns true if no graphical element components were added.
         */
        isEmpty(): boolean;
        /**
         * Returns number of added components.
         */
        numberOfComponents(): number;
        /**
         * Returns a specified component.
         */
        component(theIndex: number): ModelData_PMIGraphicalElementComponent | undefined;
    }
    /**
     * Base class for various component types.
     */
    class ModelData_PMIGraphicalElementComponent {
        accept(theVisitor: ModelData_PMIGraphicalElementComponentVisitor): Promise<void>;
    }
    /**
     * Defines a visitor of the components.
     */
    class ModelData_PMIGraphicalElementComponentVisitor {
        visitOutlinedComponent(theComponent: ModelData_PMIOutlinedComponent): Promise<void> | void;
        visitTextComponent(theComponent: ModelData_PMITextComponent): Promise<void> | void;
        visitTriangulatedComponent(theComponent: ModelData_PMITriangulatedComponent): Promise<void> | void;
    }
    /**
     * Base class for various outline types.
     */
    class ModelData_PMIOutline {
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Defines a visitor of the outlines.
     *
     * Method {@link cadex.ModelData_PMIOutlineVisitor#visitCompositeOutlineEnter visitCompositeOutlineEnter()} returns true
     * if the child outlines of the composite outline should be visited.
     * If the method returns false then they will not be visited.
     * The method {@link cadex.ModelData_PMIOutlineVisitor#visitCompositeOutlineLeave visitCompositeOutlineLeave()} will always be called.
     */
    class ModelData_PMIOutlineVisitor {
        visitPolyOutline(theOutline: ModelData_PMIPolyOutline): Promise<void> | void;
        visitPoly2dOutline(theOutline: ModelData_PMIPoly2dOutline): Promise<void> | void;
        visitCurveOutline(theOutline: ModelData_PMICurveOutline): Promise<void> | void;
        visitCurve2dOutline(theOutline: ModelData_PMICurve2dOutline): Promise<void> | void;
        visitCompositeOutlineEnter(theOutline: ModelData_PMICompositeOutline): Promise<boolean> | boolean;
        visitCompositeOutlineLeave(theOutline: ModelData_PMICompositeOutline): Promise<void> | void;
    }
    /**
     * Creates an instance of ModelData_PMIOutlinedComponent.
     */
    class ModelData_PMIOutlinedComponent extends ModelData_PMIGraphicalElementComponent {
        constructor(theOutline?: ModelData_PMIOutline);
        /**
         * Associated outline.
         */
        outline: ModelData_PMIOutline;
        accept(theVisitor: ModelData_PMIGraphicalElementComponentVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMITable.
     */
    class ModelData_PMIPlane extends ModelData_BaseObject {
        constructor(thePlane?: ModelData_Plane, theName?: string);
        /**
         * A geometrical plane.
         */
        readonly plane: ModelData_Plane;
    }
    /**
     * Creates an instance of ModelData_PMIPoly2dOutline.
     */
    class ModelData_PMIPoly2dOutline extends ModelData_PMIOutline {
        constructor(theLineSet?: ModelData_PolyLine2dSet);
        lineSet: ModelData_PolyLine2dSet;
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMIPolyOutline.
     */
    class ModelData_PMIPolyOutline extends ModelData_PMIOutline {
        constructor(theLineSet?: ModelData_PolyLineSet);
        lineSet: ModelData_PolyLineSet;
        accept(theVisitor: ModelData_PMIOutlineVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMISavedView.
     */
    class ModelData_PMISavedView extends ModelData_BaseObject {
        constructor(theCamera?: ModelData_PMICamera, theName?: string);
        /**
         * Camera.
         */
        camera: ModelData_PMICamera;
        /**
         * List of graphical elements.
         * This method is opposed to the C++ [ModelData_PMISavedView::GraphicalElementIterator]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_saved_view.html} class.
         */
        elements: ModelData_PMIGraphicalElement[];
        /**
         * Adds a graphical element.
         */
        addGraphicalElement(theElement: ModelData_PMIGraphicalElement): void;
        /**
         * Returns number of added graphical elements.
         */
        numberOfGraphicalElements(): number;
        /**
         * Returns a specified element.
         */
        graphicalElement(theIndex: number): ModelData_PMIGraphicalElement | undefined;
    }
    /**
     * Provides {@link cadex.ModelData_PMITable PMI table}.
     *
     * Used to defer population of the PMI data and thereby to reduce peak memory footprint.
     */
    class ModelData_PMITableProvider {
        /**
         * Feeds the PMI table.
         * This method can depend of the network requests which makes asynchronously, so returns Promise.
         * Subclasses must redefine this method to call {@link cadex.ModelData_PMITable#add add()} of thePMITable.
         * @param thePMITable - The table to feed.
         * @returns Resolved promise if PMI table has been feeded successfully.
         */
        feed(thePMITable: ModelData_PMITable): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMITable.
     */
    class ModelData_PMITable extends ModelData_BaseObject {
        constructor(theName?: string);
        /**
         * Reference to [Provider]{@link cadex.ModelData_PMITableProvider} class.
         */
        static readonly Provider: any;
        /**
         * Return list of graphical elements.
         * This method is opposed to the C++ [ModelData_PMITable::PMIDataIterator]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_table.html} class.
         */
        pmiDataItems(): Promise<ModelData_PMIData[]>;
        /**
         * Return list of saved view.
         * This method is opposed to the C++ [ModelData_PMITable::SavedViewIterator]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_table.html} class.
         */
        views(): Promise<ModelData_PMISavedView[]>;
        /**
         * Return list of saved view.
         * This method is opposed to the C++ [ModelData_PMITable::PlaneIterator]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___pmi_table.html} class.
         */
        planes(): Promise<ModelData_PMIPlane[]>;
        /**
         * Adds PMI table provider.
         * @param theProvider - The provider to be added.
         */
        addProvider(theProvider: ModelData_PMITableProvider): void;
        /**
         * Appends a collection of PMI entities.
         */
        addTable(theTable: ModelData_PMITable): void;
        /**
         * Adds a graphical element.
         */
        add(theData: ModelData_PMIData): void;
        /**
         * Adds a saved view.
         */
        addView(theView: ModelData_PMISavedView): void;
        /**
         * Adds a plane.
         */
        addPlane(thePlane: ModelData_PMIPlane): void;
        /**
         * Returns true if no PMI items or providers have been added.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of added PMI data objects.
         */
        numberOfPMIData(): number;
        /**
         * Returns the number of Saved View objects.
         */
        numberOfSavedViews(): number;
        /**
         * Returns the number of PMI planes.
         */
        numberOfPlanes(): number;
        clear(): void;
    }
    /**
     * Creates an instance of ModelData_PMITextComponent.
     */
    class ModelData_PMITextComponent extends ModelData_PMIGraphicalElementComponent {
        /**
         * Coordinates in the plane. Default is (0,0)
         */
        textOrigin: ModelData_Point2d;
        /**
         * Outline for text. Default is null.
         */
        outline: ModelData_PMIOutline;
        /**
         * Text to display. Default is null.
         */
        text: string;
        /**
         * Size of the font. Default is 16.
         */
        fontSize: number;
        accept(theVisitor: ModelData_PMIGraphicalElementComponentVisitor): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PMITriangulatedComponent.
     */
    class ModelData_PMITriangulatedComponent extends ModelData_PMIGraphicalElementComponent {
        constructor(theTriangleSet?: ModelData_IndexedTriangleSet);
        /**
         * A geometrical plane.
         */
        triangleSet: ModelData_IndexedTriangleSet;
        accept(theVisitor: ModelData_PMIGraphicalElementComponentVisitor): Promise<void>;
    }
    /**
     * Defines a PMI graphical element type.
     */
    enum ModelData_PMIType {
        Note = 0,
        Dimension = 1,
        Tolerance = 2,
        CoordinateSystem = 3,
        CenterLine = 4,
        ReferenceGeometry = 5,
        MeasurementPoint = 6,
        Datum = 7,
        FeatureControlFrame = 8,
        Weld = 9,
        SurfaceFinish = 10,
        Section = 11,
        Undefined = 1000,
        UserDefined = 1001
    }
    /**
     * Creates an instance of ModelData_Part.
     * @param [theName] - Name of the part
     */
    class ModelData_Part extends ModelData_SceneGraphElement {
        constructor(theName?: string);
        /**
         * Reference to [RepresentationVisitor]{@link cadex.ModelData_RepresentationVisitor} class.
         */
        static readonly RepresentationVisitor: any;
        /**
         * List of representations.
         */
        representations: ModelData_Representation[];
        /**
         * Adds a representation.
         * @param theRepresentation - The representation to add.
         */
        addRepresentation(theRepresentation: ModelData_Representation): void;
        /**
         * Returns a B-Rep representation.
         * Returns undefined if there is no B-Rep representation.
         */
        brepRepresentation(): ModelData_BRepRepresentation | undefined;
        /**
         * Returns a polygonal representation that matches the specified mask.
         * Returns undefined if there is no Poly representation.
         * @param theRepresentationMask - The representation mask.
         */
        polyRepresentation(theRepresentationMask: number): ModelData_PolyRepresentation | undefined;
        /**
         * Find representation by selector. Returns undefined if there is no representation.
         * @param theRepSelector - The representation selector.
         */
        representation(theRepSelector: ModelData_RepresentationSelector | string): ModelData_Representation | undefined;
        accept(theVisitor: ModelData_SceneGraphElementVisitor): Promise<void>;
        acceptRepresentationVisitor(theVisitor: ModelData_RepresentationVisitor): Promise<void>;
    }
    /**
     * Provides store a graphical image as a rectangular array of pixel color values.
     */
    class ModelData_PixMap {
        constructor(thePixelData: Uint8Array, theWidth: number, theHeight: number, thePixelFormat: number);
        /**
         * Width of the image.
         */
        readonly width: number;
        /**
         * Height of the image.
         */
        readonly height: number;
        /**
         * A pixel format. Should be one of {@link cadex.ModelData_PixelFormat cadex.ModelData_PixelFormat}.
         */
        readonly pixelFormat: number;
        /**
         * Data of pixels.
         */
        readonly pixelData: Uint8Array;
    }
    /**
     * Used to defer loading of pixmap of the file texture.
     */
    class ModelData_PixMapTextureProvider {
        /**
         * @returns Resolved promise if texture pixmap has been load successfully.
         */
        feed(thePixMapTexture: ModelData_PixMapTexture): Promise<ModelData_PixMap>;
    }
    /**
     * Creates an instance of ModelData_PixMapTexture.
     */
    class ModelData_PixMapTexture {
        constructor(thePixMap: ModelData_PixMap, theTextureType?: number, theTextureParameters?: ModelData_TextureParameters);
        /**
         * Returns pixmap. This method flushes provider.
         */
        pixmap(): Promise<ModelData_PixMap>;
        setPixMap(thePixMap: ModelData_PixMap): void;
        accept(theVisitor: ModelData_TextureVisitor): Promise<void>;
    }
    /**
     * Pixel format.
     */
    enum ModelData_PixelFormat {
        ModelData_PF_None = 0,
        ModelData_PF_RGB = 1,
        ModelData_PF_RGBA = 2,
        ModelData_PF_Alpha = 3,
        ModelData_PF_Luminance = 4,
        ModelData_PF_LuminanceAlpha = 5
    }
    /**
     * Creates a plane located in 3D space with an axis placement three axis.
     */
    class ModelData_Plane {
        constructor(thePlacement: ModelData_Axis3Placement);
        /**
         * Creates a plane from origin point and the normal direction.
         * @param [thePoint] - The plane point.
         * @param [theNormal] - The plane normal.
         */
        static fromPointAndNormal(thePoint?: ModelData_Point, theNormal?: ModelData_Direction): ModelData_Plane;
        uMin(): number;
        uMax(): number;
        vMin(): number;
        vMax(): number;
        value(theParameterU: number, theParameterV: number, theTarget: ModelData_Point): void;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_Plane;
        /**
         * Copy plane params from another plane.
         * @param thePlane - The plane to copy from.
         * @returns Current object.
         */
        copy(thePlane: ModelData_Plane): ModelData_Plane;
    }
    /**
     * Creates an instance of ModelData_Point.
     * @param [x = 0] - x component
     * @param [y = 0] - y component
     * @param [z = 0] - z component
     */
    class ModelData_Point {
        constructor(x?: number, y?: number, z?: number);
        /**
         * X coord.
         */
        x: number;
        /**
         * Y coord.
         */
        y: number;
        /**
         * Z coord.
         */
        z: number;
        /**
         * Sets coordinates
         * @param x - X coord
         * @param y - Y coord
         * @param z - Z coord
         * @returns Current object.
         */
        setCoord(x: number, y: number, z: number): ModelData_Point;
        /**
         * Add point to current
         * @param thePoint - The point to add
         * @returns Current object.
         */
        add(thePoint: ModelData_XYZ): ModelData_Point;
        /**
         * Subtract point from current
         * @param thePoint - The point to add subtract
         * @returns Current object.
         */
        sub(thePoint: ModelData_XYZ): ModelData_Point;
        /**
         * Transforms the point with a transformation matrix.
         * @returns Current object
         */
        transform(theTransformation: ModelData_Transformation): ModelData_Point;
        /**
         * Returns a new point which is transformed with a transformation matrix.
         */
        transformed(theTransformation: ModelData_Transformation): ModelData_Point;
        /**
         * Creates copy of the current object
         */
        clone(): ModelData_Point;
        /**
         * @param thePoint - The point to copy from.
         * @returns Current object.
         */
        copy(thePoint: ModelData_XYZ): ModelData_Point;
        /**
         * @returns Current object.
         */
        fromArray(theArray: number[], theOffset?: number): ModelData_Point;
        toString(): string;
    }
    /**
     * Creates an instance of ModelData_Point2d.
     * @param [x = 0] - x component
     * @param [y = 0] - y component
     */
    class ModelData_Point2d {
        constructor(x?: number, y?: number);
        /**
         * X coord.
         */
        x: number;
        /**
         * Y coord.
         */
        y: number;
        /**
         * Sets coordinates
         * @param x - X coord
         * @param y - Y coord
         */
        setCoord(x: number, y: number): void;
        /**
         * Add point to current
         * @param thePoint - The point to add
         * @returns Current object.
         */
        add(thePoint: ModelData_XY): ModelData_Point2d;
        /**
         * Subtract point from current
         * @param thePoint - The point to add subtract
         * @returns Current object.
         */
        sub(thePoint: ModelData_XY): ModelData_Point2d;
        /**
         * Creates copy of the current object
         */
        clone(): ModelData_Point2d;
        /**
         * @param thePoint - The point to copy from.
         * @returns Current object.
         */
        copy(thePoint: ModelData_XY): ModelData_Point2d;
        /**
         * @returns Current object.
         */
        fromArray(theArray: number[], theOffset?: number): ModelData_Point2d;
        toString(): string;
    }
    class ModelData_PolyLine2dSet {
    }
    /**
     * Creates an instance of ModelData_PolyLineSet.
     */
    class ModelData_PolyLineSet extends ModelData_PolyVertexSet {
        /**
         * Returns a number of vertices in polyline.
         * @param thePolyline - The polyline number.
         */
        numberOfLineVertices(thePolyline: number): number;
        /**
         * Returns a number of poly lines.
         */
        numberOfPolylines(): number;
    }
    /**
     * Defines a polygonal shape consisting of individual points.
     */
    class ModelData_PolyPointSet extends ModelData_PolyVertexSet {
    }
    /**
     * Provides {@link cadex.ModelData_PolyRepresentation polygonal representation}.
     *
     * Used to defer construction of the polygonal representation and thereby to reduce peak memory footprint.
     */
    class ModelData_PolyRepresentationProvider {
        /**
         * Feeds the representation.
         * This method can depend of the network requests which makes asynchronously, so it returns Promise.
         * Subclasses must redefine this method to call {@link cadex.ModelData_PolyRepresentation#add add()}
         * of theRepresentation.
         * @param theRepresentation - The representation to feed.
         * @returns Resolved promise if representation has been feeded successfully.
         */
        feed(theRepresentation: ModelData_PolyRepresentation): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PolyRepresentation.
     * @param [theShape] - The poly shape to be constructed from.
     */
    class ModelData_PolyRepresentation extends ModelData_Representation {
        constructor(theShape?: ModelData_PolyShape);
        /**
         * Reference to [Provider]{@link cadex.ModelData_PolyRepresentationProvider} class.
         */
        static readonly Provider: any;
        /**
         * Adds a polygonal shape.
         * @param theShape - The poly shapes to add.
         */
        add(theShape: ModelData_PolyShape): void;
        /**
         * Add Poly representations provider.
         * @param theProvider - The provider to be added.
         */
        addProvider(theProvider: ModelData_PolyRepresentationProvider): void;
        /**
         * Returns Promise for list of shapes. This method flushes providers.
         */
        polyShapeList(): Promise<ModelData_PolyShapeList>;
        accept(theVisitor: ModelData_RepresentationVisitor): Promise<void>;
    }
    /**
     * Base class for polygonal meshes.
     */
    class ModelData_PolyShape extends ModelData_BaseObject {
    }
    /**
     * Defines a list of poly shapes.
     * Body list is used by ModelData_PolyRepresentation to hold root shapes.
     */
    class ModelData_PolyShapeList extends ModelData_PolyShape {
        /**
         * Adds body to the body list.
         * @param thePolyShape - The body to add.
         */
        append(thePolyShape: ModelData_PolyShape): void;
        /**
         * Returns the number of added poly shapes.
         */
        size(): number;
        /**
         * Retrieve poly shape by index.
         * @param theIndex - Must be in the range [0, size() - 1]. Otherwise the result is undefined.
         */
        element(theIndex: number): ModelData_PolyVertexSet;
    }
    /**
     * Creates an instance of ModelData_PolyVertexSet.
     */
    class ModelData_PolyVertexSet extends ModelData_PolyShape {
        appearance: ModelData_Appearance | undefined;
        /**
         * Coords array.
         */
        readonly coords: Float32Array | undefined;
        /**
         * Colors array.
         */
        readonly colors: Float32Array | undefined;
        /**
         * Returns a vertex coordinate per its index.
         * Note: changing returned object does not change original coord.
         * @param theIndex - The vertex index.
         */
        coordinate(theIndex: number): ModelData_Point | undefined;
        /**
         * Returns a color per its index.
         * Note: changing returned object does not change original color.
         * @param theIndex - The color index.
         */
        color(theIndex: number): ModelData_ColorObject | undefined;
        /**
         * Returns a number of coord elements.
         */
        numberOfVertices(): number;
        /**
         * Returns a number of color elements.
         */
        numberOfColors(): number;
        /**
         * Return true if object has colors per vertex.
         */
        hasColors(): boolean;
    }
    /**
     * Provides properties to the {@link cadex.ModelData_PropertyTable property table}.
     *
     * Used to defer population of the properties and thereby to reduce peak memory footprint.
     */
    class ModelData_PropertyTableProvider {
        /**
         * Feeds the property table.
         * This method can depend of the network request which makes asynchronously, so it should return Promise.
         * Subclasses must redefine this method to call {@link cadex.ModelData_PropertyTable#add add()} of theTable.
         * @param theTable - The property table to feed.
         * @returns Resolved promise if property table has been feeded successfully.
         */
        feed(theTable: ModelData_PropertyTable): Promise<void>;
    }
    /**
     * Creates an instance of ModelData_PropertyTable.
     */
    class ModelData_PropertyTable extends ModelData_BaseObject {
        constructor(theName?: string);
        /**
         * Reference to [Provider]{@link cadex.ModelData_PropertyTableProvider} class.
         */
        static readonly Provider: any;
        /**
         * Key to designate a 'name' property.
         */
        static readonly NamePropertyName: string;
        /**
         * Key to designate a 'surface area' validation property.
         */
        static readonly SurfaceAreaPropertyName: string;
        /**
         * Key to designate a 'volume' validation property.
         */
        static readonly VolumePropertyName: string;
        /**
         * Key to designate a 'centroid' validation property.
         */
        static readonly CentroidPropertyName: string;
        /**
         * Key to designate a 'bounding box' property.
         */
        static readonly BoundingBoxPropertyName: string;
        /**
         * Add property to table.
         * @param theKey - The property name.
         * @param theValue - The Property value.
         */
        add(theKey: string, theValue: string | number | Date | ModelData_Point | ModelData_Box): void;
        /**
         * Appends properties from another property table.
         * @param thePropertyTable - The table to append properties from.
         */
        addTable(thePropertyTable: ModelData_PropertyTable): void;
        /**
         * Add property table provider.
         * @param theProvider - The provider.
         */
        addProvider(theProvider: ModelData_PropertyTableProvider): void;
        /**
         * Return dictionary object. Keys are properties names, values are properties values.
         * This method is opposed to the C++ [ModelData_PropertyTable::Accept()]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___property_table.html} method.
         * @returns Promise with plane JavaScript object.
         */
        properties(): Promise<object>;
        /**
         * Returns true if no property items or providers have been added.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of added properties.
         */
        size(): number;
        /**
         * Return Promise with property. If property not found Promise will resolve with undefined.
         * @param theName - The property name
         * @param [theFlushProviders = false] - Indicate should flush providers or not.
         */
        findProperty(theName: string, theFlushProviders?: boolean): Promise<any>;
        /**
         * Discards associated data.
         * Providers which have been added with their deleters will be deleted.
         */
        clear(): void;
    }
    /**
     * A ray that emits from an origin in a certain direction.
     * @param [theOrigin] - The origin of the Ray. Default is a { 0, 0, 0 }.
     * @param [theDirection] - The direction of the Ray. Default is a { 0, 0, -1 }.
     */
    class ModelData_Ray {
        constructor(theOrigin?: ModelData_XYZ, theDirection?: ModelData_XYZ);
        /**
         * The origin of the Ray.
         */
        readonly origin: ModelData_Point;
        /**
         * The direction of the Ray.
         */
        readonly direction: ModelData_Direction;
    }
    /**
     * Base class for all representations.
     */
    class ModelData_Representation extends ModelData_BaseObject {
        accept(theVisitor: ModelData_RepresentationVisitor): Promise<void>;
    }
    /**
     * Defines a visitor of the representations.
     * This visitor is opposed to the C++ [ModelData_Part::RepresentationVisitor]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___part.html#ac506824e6a7007b1c0b57ef4e856c470} class.
     * This class can be also accessed as {@link cadex.ModelData_Part.RepresentationVisitor ModelData_Part.RepresentationVisitor}.
     */
    class ModelData_RepresentationVisitor {
        visitBRepRepresentation(theBRepRep: ModelData_BRepRepresentation): Promise<void> | void;
        visitPolyRepresentation(thePolyRep: ModelData_PolyRepresentation): Promise<void> | void;
    }
    /**
     * Defines a mask to filter part representations.
     */
    enum ModelData_RepresentationMask {
        /**
         * Filter only B-Rep representation.
         */
        ModelData_RM_BRep = 1,
        /**
         * Filter coarse Poly representation.
         */
        ModelData_RM_CoarseLOD = 16,
        /**
         * Filter medium Poly representation.
         */
        ModelData_RM_MediumLOD = 32,
        /**
         * Filter fine Poly representation.
         */
        ModelData_RM_FineLOD = 64,
        /**
         * Filter any Poly representation.
         */
        ModelData_RM_Poly = 112,
        /**
         * Filter any representation.
         */
        ModelData_RM_Any = 113
    }
    /**
     * Base class for all representation selectors.
     */
    class ModelData_RepresentationSelector {
        /**
         * Compare two selectors to be equal.
         * @param theOther - The other selector to compare.
         */
        isEqual(theOther: ModelData_RepresentationSelector): boolean;
    }
    /**
     * Creates an instance of ModelData_RepresentationMaskSelector.
     * @param theMask - The mask.
     */
    class ModelData_RepresentationMaskSelector extends ModelData_RepresentationSelector {
        constructor(theMask: number);
        /**
         * Mask of selector.
         */
        mask: number;
        /**
         * @param theOther - The other selector to compare.
         */
        isEqual(theOther: ModelData_RepresentationSelector): boolean;
    }
    /**
     * Creates an instance of ModelData_RepresentationMaskSelector.
     * @param theName - The name of the rep.
     */
    class ModelData_RepresentationNameSelector extends ModelData_RepresentationSelector {
        constructor(theName: string);
        name: string;
        /**
         * @param theOther - The other selector to compare.
         */
        isEqual(theOther: ModelData_RepresentationSelector): boolean;
    }
    /**
     * Creates an instance of ModelData_SceneGraphElement.
     */
    class ModelData_SceneGraphElement extends ModelData_BaseObject {
        /**
         * Appearance of the element.
         */
        appearance: ModelData_Appearance | undefined;
        /**
         * Property table of the element.
         */
        properties: ModelData_PropertyTable | undefined;
        /**
         * PMI table of the element.
         */
        pmi: ModelData_PMITable | undefined;
        /**
         * Adds a property table to the element.
         * If this object did not have properties yet, then theProperties are just linked to this object.
         * Otherwise, the elements of theProperties are appended to existing property table
         * (see {@link cadex.ModelData_PropertyTable#add ModelData_PropertyTable#add()} method).
         * @param theProperties - Properties to add.
         */
        addProperties(theProperties: ModelData_PropertyTable): void;
        /**
         * Adds a PMI table to the element.
         *
         * If this object did not have PMI yet, then thePMI are just linked to this object.
         * Otherwise, the elements of thePMI are appended to existing PMI table
         * (see {@link cadex.ModelData_PMITable#add ModelData_PMITable#add()}).
         */
        addPMI(thePMI: ModelData_PMITable): void;
        /**
         * Accepts an element visitor.
         *
         * The order of visiting depends on the type of this object:
         *
         * * for a part invokes a visitor for the part ({@link cadex.ModelData_Model.ElementVisitor#visitPart visitPart()});
         *
         * * for an instance first enters the instance by calling
         * {@link cadex.ModelData_Model.ElementVisitor#visitInstanceEnter visitInstanceEnter()}.
         * If it returns true then visits the referred element. Then leaves the instance calling
         * {@link cadex.ModelData_Model.ElementVisitor#visitInstanceLeave visitInstanceLeave()}.
         *
         * * for an assembly first enters the assembly by calling
         * {@link cadex.ModelData_Model.ElementVisitor#visitAssemblyEnter visitAssemblyEnter()}.
         * If it returns true then visits all the assembly children. Then leaves the assembly calling
         * {@link cadex.ModelData_Model.ElementVisitor#visitAssemblyLeave visitAssemblyLeave()}.
         */
        accept(theVisitor: ModelData_SceneGraphElementVisitor): Promise<void>;
    }
    /**
     * Defines a visitor of the scene graph elements.
     * This visitor is opposed to the C++ [ModelData_Model::VoidElementVisitor]{@link https://cadexchanger.com/download/sdk/doc/dev/html/classcadex_1_1_model_data___model_1_1_void_element_visitor.html} class.
     * This class can be also accessed as {@link cadex.ModelData_Model.ElementVisitor ModelData_Model.ElementVisitor}.
     *
     * The Visitor follows a hierarchical visitor pattern (see
     * http://c2.com/cgi/wiki?HierarchicalVisitorPattern) what enables to track entering
     * and leaving composite entities - assemblies and instances.
     *
     * Methods visitInstanceEnter() and visitAssemblyEnter() returns Promise resolved to true if the child elements
     * of the assembly or a referred element of the instance should be visited.
     * If the method returns Promise resolved to false they will not be visited.
     * The methods visitInstanceLeave() and visitAssemblyEnter() will always be called.
     */
    class ModelData_SceneGraphElementVisitor {
        visitPart(thePart: ModelData_Part): Promise<void> | void;
        visitInstanceEnter(theInstance: ModelData_Instance): Promise<boolean> | boolean;
        visitInstanceLeave(theInstance: ModelData_Instance): Promise<void> | void;
        visitAssemblyEnter(theAssembly: ModelData_Assembly): Promise<boolean> | boolean;
        visitAssemblyLeave(theAssembly: ModelData_Assembly): Promise<void> | void;
    }
    /**
     * Creates an instance of ModelData_Shape.
     * @param [thePrs] - The shape poly presentation.
     */
    class ModelData_Shape {
        constructor(thePrs?: ModelData_ShapePrs);
        /**
         * Presentations of this shape.
         */
        prs: ModelData_ShapePrs | undefined;
    }
    /**
     * Creates an instance of ModelData_ShapePrs.
     * @param [theMainPolyVertexSet] - Triangle set for faces, linesets for wireframe, point for acorn.
     * @param [theBoundaryPolyVertexSet] - theBoundaries Boundaries of the geometry.
     */
    class ModelData_ShapePrs {
        constructor(theMainPolyVertexSet?: ModelData_PolyVertexSet, theBoundaryPolyVertexSet?: ModelData_PolyVertexSet);
        data(): ModelData_PolyVertexSet[];
        /**
         * Append PolyVertexSet.
         * @param [theMainPolyVertexSet] - Triangle set for faces, line-sets for wireframe, point for acorn.
         * @param [theBoundaryPolyVertexSet] - theBoundaries Boundaries of the geometry.
         */
        append(theMainPolyVertexSet?: ModelData_PolyVertexSet, theBoundaryPolyVertexSet?: ModelData_PolyVertexSet): void;
    }
    /**
     * Base class for geometrical surfaces.
     *
     * Surfaces in 3D space are used to represent boundaries of a body (e.g. solid or sheet body).
     * Each ModelData_Face "face" must refer to a surface.
     */
    class ModelData_Surface {
        /**
         * Returns a minimum parameter of a definition domain in U direction.
         */
        uMin(): number;
        /**
         * Returns a maximum parameter of a definition domain in U direction.
         */
        uMax(): number;
        /**
         * Returns a minimum parameter of a definition domain in V direction.
         */
        vMin(): number;
        vMax(): number;
        /**
         * Evaluates a point on the surface.
         * theParameterU must be within [UMin(), UMax()] if the surface is not U-periodic.
         * theParameterV must be within [VMin(), VMax()] if the surface is not V-periodic.
         */
        value(theParameterU: number, theParameterV: number, theTarget: ModelData_Point): void;
    }
    /**
     * Creates an instance of ModelData_Texture.
     */
    class ModelData_Texture extends ModelData_BaseObject {
        constructor(theTextureType?: number, theTextureParameters?: ModelData_TextureParameters);
        /**
         * A texture type. Should be one of {@link cadex.ModelData_TextureType cadex.ModelData_TextureType}.
         * Default value is {@link cadex.ModelData_TextureType#ModelData_TT_Unknown cadex.ModelData_TextureType.ModelData_TT_Unknown}.
         */
        type: number;
        /**
         * Parameters of texture
         * Default value is default initialized object.
         */
        parameters: ModelData_TextureParameters;
        /**
         * Accepts a texture visitor.
         */
        accept(theVisitor: ModelData_TextureVisitor): Promise<void>;
    }
    /**
     * Texture blending mode.
     */
    enum ModelData_TextureBlendMode {
        ModelData_TBM_Decal = 0,
        ModelData_TBM_Modulate = 1,
        ModelData_TBM_Replace = 2
    }
    /**
     * Texture magnification filter.
     */
    enum ModelData_TextureMagnificationFilter {
        ModelData_TMagF_Nearest = 0,
        ModelData_TMagF_Linear = 1
    }
    /**
     * Texture mapping mode.
     */
    enum ModelData_TextureMappingMode {
        ModelData_TMM_UVMapping = 0,
        ModelData_TMM_SphereMapping = 1
    }
    /**
     * Texture minification filter.
     */
    enum ModelData_TextureMinificationFilter {
        ModelData_TMinF_Nearest = 0,
        ModelData_TMinF_NearestMipMapNearest = 1,
        ModelData_TMinF_NearestMipMapLinear = 2,
        ModelData_TMinF_Linear = 3,
        ModelData_TMinF_LinearMipMapNearest = 4,
        ModelData_TMinF_LinearMipMapLinear = 5
    }
    /**
     * Creates an instance of ModelData_Texture.
     */
    class ModelData_TextureParameters extends ModelData_BaseObject {
        /**
         * Indicates to generate mipmaps (if possible) for a texture or not.
         * Default value is true.
         */
        generateMipmaps: boolean;
        /**
         * A magnification filter which indicates how the texture is sampled when a texel covers more than one pixel.
         * Should be one of {@link cadex.ModelData_TextureMagnificationFilter cadex.ModelData_TextureMagnificationFilter}.
         * Default value is cadex.ModelData_TextureMagnificationFilter.ModelData_TMagF_Linear,
         * which takes the four closest texels and bilinearly interpolates among them.
         */
        magnificationFilter: number;
        /**
         * A minification filter which indicates how the texture is sampled when a texel covers less than one pixel.
         * Should be one of {@link cadex.ModelData_TextureMinificationFilter cadex.ModelData_TextureMinificationFilter}.
         * Default value is cadex.ModelData_TextureMinificationFilter.ModelData_TMinF_LinearMipMapLinear,
         * which uses mipmapping and a trilinear filter.
         */
        minificationFilter: number;
        /**
         * A wrap mode which defines how the texture is wrapped horizontally and corresponds to U in UV mapping.
         * Should be one of {@link cadex.ModelData_TextureWrapMode cadex.ModelData_TextureWrapMode}.
         * Default value is cadex.ModelData_TextureWrapMode.ModelData_TWM_Repeat.
         */
        wrapModeU: number;
        /**
         * A wrap mode which defines how the texture is wrapped horizontally and corresponds to V in UV mapping.
         * Should be one of {@link cadex.ModelData_TextureWrapMode cadex.ModelData_TextureWrapMode}.
         * Default value is cadex.ModelData_TextureWrapMode.ModelData_TWM_Repeat.
         */
        wrapModeV: number;
        /**
         * A blending mode describes how to mix texture colors. Should be one of {@link cadex.ModelData_TextureBlendMode cadex.ModelData_TextureBlendMode}.
         * Default value is cadex.ModelData_TextureBlendMode.ModelData_TBM_Decal.
         */
        blendMode: number;
        /**
         * A mapping mode describes how to calculate textures coords. Should be one of {@link cadex.ModelData_TextureMappingMode cadex.ModelData_TextureMappingMode}.
         * Default value is cadex.ModelData_TextureMappingMode.ModelData_TMM_UVMapping.
         */
        mappingMode: number;
        /**
         * A rotation is describe angle to rotate texture coords to.
         * Default value is 0.
         */
        rotation: number;
        /**
         * A scale applied to the texture width.
         * Default value is 1
         */
        scaleU: number;
        /**
         * A scale applied to the texture height.
         * Default value is 1
         */
        scaleV: number;
        /**
         * A translation which indicates how much a single repetition of the texture is offset from the beginning in U direction.
         * Default value is 0
         */
        translationU: number;
        /**
         * A translation which indicates how much a single repetition of the texture is offset from the beginning in V direction.
         * Default value is 0
         */
        translationV: number;
        /**
         * Checks for strict equality of this parameters and theOther.
         */
        equals(theOther: ModelData_TextureParameters | undefined): boolean;
    }
    /**
     * Creates an instance of ModelData_TextureSet.
     */
    class ModelData_TextureSet extends ModelData_BaseObject {
        /**
         * Array of Textures of set
         */
        readonly textures: ModelData_Texture[];
        /**
         * Returns true is no textures in texture set
         */
        isEmpty(): boolean;
        /**
         * Returns number of textures in texture set
         */
        numberOfTextures(): number;
        /**
         * Returns texture by index
         */
        texture(theIndex: number): ModelData_Texture;
        /**
         * Adds texture to texture set.
         * @returns true if insertion was successfully
         */
        add(theTexture: ModelData_Texture): boolean;
        /**
         * Removes form texture set if exist.
         * @returns true if deleting was successfully.
         */
        remove(theTexture: ModelData_Texture): boolean;
        /**
         * Check texture to be in texture set.
         * @returns true if texture set contains the texture
         */
        contains(theTexture: ModelData_Texture): boolean;
        /**
         * Accepts a texture visitor.
         */
        accept(theVisitor: ModelData_TextureVisitor): Promise<void>;
        combineWith(theOther: ModelData_TextureSet): void;
    }
    /**
     * Defines types of texture.
     */
    enum ModelData_TextureType {
        ModelData_TT_Unknown = 0,
        ModelData_TT_DiffuseMap = 1,
        ModelData_TT_SpecularMap = 2,
        ModelData_TT_EmissiveMap = 3,
        ModelData_TT_BumpMap = 4,
        ModelData_TT_NormalMap = 5,
        ModelData_TT_DisplacementMap = 6,
        ModelData_TT_SphereEnvironmentMap = 7
    }
    /**
     * Defines a visitor of the textures.
     */
    class ModelData_TextureVisitor {
        visitFileTexture(theFileTexture: ModelData_FileTexture): Promise<void> | void;
        visitPixMapTexture(thePixMapTexture: ModelData_PixMapTexture): Promise<void> | void;
    }
    /**
     * Texture wrapping mode.
     */
    enum ModelData_TextureWrapMode {
        ModelData_TWM_ClampToEdge = 0,
        ModelData_TWM_Repeat = 1,
        ModelData_TWM_MirroredRepeat = 2
    }
    /**
     * Creates an instance of ModelData_Transformation.
     * @param [theMatrix] - Matrix in array form.
     */
    class ModelData_Transformation {
        constructor(theMatrix?: number[]);
        /**
         * Elements of transformation 4x4 matrix
         */
        readonly elements: number[];
        /**
         * Retrieves individual matrix elements.
         * @param theRow - Row index.
         * @param theCol - Column index.
         */
        data(theRow: number, theCol: number): number;
        /**
         * Multiplies this matrix with another one.
         * @returns Current object
         */
        multiply(theTrsf: ModelData_Transformation): ModelData_Transformation;
        /**
         * Creates copy of the current object.
         */
        clone(): ModelData_Transformation;
        /**
         * Copy values from another transformation.
         * @param theTrsf - The transformation to copy from.
         * @returns Current object.
         */
        copy(theTrsf: ModelData_Transformation): ModelData_Transformation;
        toString(): string;
    }
    class ModelData_Vertex extends ModelData_Shape {
        constructor(thePoint: ModelData_Point);
        /**
         * Point assigned to this vertex.
         */
        point: ModelData_Point;
        isSame(theVertex: ModelData_Vertex): boolean;
        isEqual(theShape: ModelData_Shape): boolean;
    }
    /**
     * {@link cadex.ModelPrs_Annotation} configuration interface.
     */
    interface ModelPrs_AnnotationConfig {
        /**
         * World-space position of the annotation.
         */
        position: ModelData_XYZ;
        /**
         * Optional view3d object associated with the Annotation.
         */
        view3dObject: ModelPrs_View3dObject | undefined;
        /**
         * DOM element to render the marker.
         */
        markerElement: HTMLElement;
        /**
         * DOM element to render the label.
         */
        labelElement: HTMLElement | undefined;
        /**
         * DOM element to render the label.
         */
        camera: ModelPrs_CameraState | undefined;
        /**
         * Initial value for {@link cadex.ModelPrs_Annotation#markerShown} property
         */
        markerShown: boolean | undefined;
        /**
         * Initial value for {@link cadex.ModelPrs_Annotation#labelShown} property
         */
        labelShown: boolean | undefined;
    }
    /**
     * A {@link cadex.ModelPrs_Marker} with an HTML marker and label attached to it.
     */
    class ModelPrs_Annotation {
        constructor(theConfig: ModelPrs_AnnotationConfig);
        /**
         * View3d object associated with the Annotation.
         */
        readonly view3dObject: ModelPrs_View3dObject | undefined;
        /**
         * Camera settings associated with the Annotation.
         */
        readonly camera: ModelPrs_CameraState | undefined;
        /**
         * Marker element associated with Annotation.
         */
        readonly markerElement: HTMLElement;
        /**
         * Optional label element associated with Annotation.
         */
        readonly labelElement: HTMLElement | undefined;
        markerShown: boolean;
        labelShown: boolean;
    }
    /**
     * {@link cadex.ModelPrs_Camera} state interface.
     */
    interface ModelPrs_CameraState {
        /**
         * World-space camera position.
         */
        position: ModelData_XYZ;
        /**
         * World-space camera target.
         */
        target: ModelData_XYZ;
        /**
         * World-space camera up vector.
         */
        up: ModelData_XYZ;
        /**
         * Camera projection type.
         */
        projectionType: ModelPrs_CameraProjectionType;
    }
    class ModelPrs_Camera {
        /**
         * Camera projection type.
         */
        cameraProjectionType: ModelPrs_CameraProjectionType;
        /**
         * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is 45.
         * Relevant for Perspective projection type only.
         */
        fov: number;
        /**
         * Position of the camera.
         */
        position: ModelData_XYZ;
        /**
         * Target of the camera.
         */
        target: ModelData_XYZ;
        /**
         * Up vector of the camera.
         */
        up: ModelData_XYZ;
        /**
         * Up vector of the camera.
         */
        getRay(thePoint: ModelData_XY): void;
        /**
         * Fit camera to see all objects in the box
         * @param theBox - the box to fit to.
         */
        fitBox(theBox: ModelData_Box): void;
        /**
         * Adds the specified JavaScript function to the list of event listeners for the specified event type on which it is called.
         * @param theType - The redraw viewport flag.
         * @param theListener - The redraw viewport flag.
         */
        addEventListener(theType: string, theListener: (...params: any[]) => any): void;
        /**
         * Removes an event listener previously registered with {@link cadex.ModelPrs_Camera#addEventListener addEventListener()}.
         * @param theType - A string which specifies the type of event for which to remove an event listener.
         * @param theListener - The JavaScript function of the event handler to remove from the event target.
         */
        removeEventListener(theType: string, theListener: (...params: any[]) => any): void;
    }
    /**
     * ViewPort camera projection mode.
     */
    enum ModelPrs_CameraProjectionType {
        Isometric = 0,
        Perspective = 1
    }
    /**
     * Display mode for visualization.
     */
    enum ModelPrs_DisplayMode {
        Global = -1,
        Wireframe = 0,
        Shaded = 1,
        ShadedWithBoundaries = 2
    }
    /**
     * User-defined displayer.
     * The actual display is provided by the user-defined subclass of ModelPrs_Displayer.
     * Its method Display() will be called by the infrastructure. In the case of async mode, it may be
     * called from asynchronously.
     */
    class ModelPrs_Displayer {
        /**
         * @param theView3dObjects - List of objects to display
         * @param theRepresentation - The presentation which view3d object created for.
         * @param theAncestors - The valid path in scenegraph to the element which displayed.
         * @param theDisplayMode - Mode to display with. See also {@link cadex.ModelPrs_DisplayMode ModelPrs_DisplayMode}.
         */
        display(theView3dObjects: ModelPrs_View3dObject[], theRepresentation: ModelData_Representation, theAncestors: ModelData_SceneGraphElement[], theDisplayMode: ModelPrs_DisplayMode): void;
    }
    /**
     * Parameters of the display operation.
     * @param theDisplayer - Function which will be called when view3d objects will created.
     * @param theDisplayMode - Mode to display with. Should be one of predefined {@link cadex.ModelPrs_DisplayMode ModelPrs_DisplayMode} value
     * @param theRepSelector - Selector of the representation to display.
     * @param [theCache = null] - Representation cache.
     * @param [theAsync = true] - Async flag.
     * @param [thePerBody = false] - The per
     */
    class ModelPrs_DisplayParams {
        constructor(theDisplayer: ModelPrs_Displayer, theDisplayMode: number, theRepSelector: ModelData_RepresentationSelector, theCache?: ModelPrs_RepresentationCache, theAsync?: boolean | number, thePerBody?: boolean);
        displayer: ModelPrs_Displayer;
        displayMode: number;
        repSelector: ModelData_RepresentationSelector;
        cache?: ModelPrs_RepresentationCache;
        async?: boolean | number;
        perBody?: boolean;
        /**
         * Default materials applied to view3d objects.
         */
        defaultMaterial?: ModelData_MaterialObject;
        /**
         * Selection color applied for selected view3d objects.
         */
        selectionColor?: ModelData_ColorObject;
        /**
         * Color applied for boundaries of BRep geometry.
         */
        boundariesColor?: ModelData_ColorObject;
        /**
         * Selection color applied for selected boundaries.
         */
        boundariesSelectionColor?: ModelData_ColorObject;
    }
    /**
     * ModelPrs_DisplayerApplier can be used to display scene graph elements.
     */
    class ModelPrs_DisplayerApplier {
        /**
         * Elements must be siblings with common ancestors contained in ancestors.
         * Ancestors is empty then elements are roots.
         * If theOptions.repCache is not specified then no caching is used
         * and the view3d objects is recomputed each time.
         * @param theElements - The elements to display.
         * @param theAncestors - Ancestors of the elements.
         * @param theOptions - The options to display.
         */
        static apply(theElements: ModelData_SceneGraphElement | ModelData_SceneGraphElement[], theAncestors: ModelData_SceneGraphElement[], theOptions: ModelPrs_DisplayParams): Promise<ModelPrs_View3dObject[]>;
    }
    /**
     * Implements {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget EventTarget} interface.
     * Base class which allow objects receive events and may have listeners for them.
     */
    class ModelPrs_EventDispatcher {
        /**
         * Adds the specified JavaScript function to the list of event listeners for the specified event type on which it is called.
         * @param theType - A case-sensitive string representing the event type to listen for.
         * @param theListener - The JavaScript function which receives a notification when an event of the specified type occurs.
         */
        addEventListener(theType: string, theListener: (...params: any[]) => any): void;
        /**
         * Removes an event listener previously registered with {@link cadex.ModelPrs_EventDispatcher#addEventListener addEventListener()}.
         * @param theType - A string which specifies the type of event for which to remove an event listener.
         * @param listener - The JavaScript function of the event handler to remove from the event target.
         */
        removeEventListener(theType: string, listener: (...params: any[]) => any): void;
        /**
         * Dispatches an event, invoking the affected event listeners in the appropriate order.
         * @param theEvent - The event-like object to be dispatched.
         */
        dispatchEvent(theEvent: any): void;
    }
    namespace ModelPrs_Marker {
        /**
         * Marker canvasPosition changed event
         */
        type CanvasPositionChangedEvent = {
            type: "canvasPositionChanged";
            canvasPosition: ModelData_Point2d;
        };
    }
    /**
     * Creates an instance of ModelPrs_Marker.
     */
    class ModelPrs_Marker {
        constructor(thePoint: ModelData_XYZ);
        /**
         * Position of the marker in 3D space.
         */
        position: ModelData_XYZ;
        /**
         * Position of the marker in canvas space.
         */
        readonly canvasPosition: ModelData_XY;
        /**
         * Z Order of marker. The higher value means the further marker from the camera.
         */
        readonly zOrder: number;
        /**
         * Adds the specified JavaScript function to the list of event listeners for the specified event type on which it is called.
         * @param theType - A case-sensitive string representing the event type to listen for.
         * @param theListener - The JavaScript function which receives a notification when an event of the specified type occurs.
         */
        addEventListener(theType: "canvasPositionChanged", theListener: (...params: any[]) => any): void;
        /**
         * Removes an event listener previously registered with {@link cadex.ModelPrs_Marker#addEventListener addEventListener()}.
         * @param theType - A string which specifies the type of event for which to remove an event listener.
         * @param theListener - The JavaScript function of the event handler to remove from the event target.
         */
        removeEventListener(theType: "canvasPositionChanged", theListener: (...params: any[]) => any): void;
    }
    /**
     * Factory to create dimensions visual objects.
     * @param [theMaterial] - The material applied to the created measurements.
     * @param [theSelectionColor] - The selection color.
     */
    class ModelPrs_MeasurementFactory {
        constructor(theMaterial?: ModelData_MaterialObject, theSelectionColor?: ModelData_ColorObject);
        /**
         * Create dimension object showing the distance from two shapes
         */
        createDistanceDimension(theFirstShape: ModelData_Vertex, theSecondShape: ModelData_Vertex): ModelPrs_View3dDimensionObject | undefined;
        /**
         * Create dimension object showing the angle from three vertexes
         */
        createAngleDimension(theFirstShape: ModelData_Vertex, theSecondShape: ModelData_Vertex, theThirdShape: ModelData_Vertex): ModelPrs_View3dDimensionObject | undefined;
    }
    /**
     * Factory to create PMI visual objects.
     * @param [theMaterial] - The material applied to the created PMI entities.
     * @param [theSelectionColor] - The selection color.
     */
    class ModelPrs_PMIFactory {
        constructor(theMaterial?: ModelData_MaterialObject, theSelectionColor?: ModelData_ColorObject);
        /**
         * Creates View3d Object from PMI Graphical element
         */
        createFromGraphicalElement(theElement: ModelData_PMIGraphicalElement, theTrsf?: ModelData_Transformation): Promise<ModelPrs_View3dObject>;
        /**
         * Creates View3d objects from PMI Table
         * @param [theAncestors] - Ancestors of the elements.
         */
        create(theTable: ModelData_PMITable, theAncestors?: ModelData_SceneGraphElement[]): Promise<ModelPrs_View3dObject[]>;
    }
    /**
     * ModelPrs_RepresentationCache can be used to store and retrieve already computed {@link cadex.ModelPrs_View3dObject ModelPrs_View3dObject}.
     */
    class ModelPrs_RepresentationCache {
        /**
         * Find interactive object in cache and return it, otherwise return undefined.
         * Must not attempt to create a representation (this is responsibility of ModelPrs_DisplayerApplier).
         * @param theSelector - Selector of the representation.
         * @param theAncestors - Ancestors to the object.
         */
        view3dObject(theSelector: ModelData_RepresentationSelector, theAncestors: ModelData_SceneGraphElement[]): ModelPrs_View3dObject[] | undefined;
        /**
         * Registers an interactive object for the given representation.
         * This saved interactive object can later be requested using the {@link cadex.ModelPrs_RepresentationCache#interactiveObject interactiveObject()} method.
         * @param theSelector - The representation selector.
         * @param theAncestors - Ancestors to the object.
         * @param theObjects - The list of objects to save.
         */
        saveView3dObject(theSelector: ModelData_RepresentationSelector, theAncestors: ModelData_SceneGraphElement[], theObjects: ModelPrs_View3dObject[]): void;
    }
    /**
     * Result of the {@link cadex.ModelData_Scene#pick scene pick} operation.
     */
    interface ModelPrs_PickResult {
        object: ModelPrs_View3dObject;
        point: ModelData_Point;
        shapes: ModelData_Shape[];
    }
    /**
     * Scene selection changed event.
     */
    type ModelPrs_SelectionChangedEvent = {
        type: 'selectionChanged';
        removed: { object: cadex.ModelPrs_View3dObject; shapes: cadex.ModelData_Shape[]; }[];
        added: { object: cadex.ModelPrs_View3dObject; shapes: cadex.ModelData_Shape[]; }[];
    };
    /**
     * Creates an instance of ModelPrs_Scene.
     */
    class ModelPrs_Scene {
        /**
         * Global selection mode. Should be one of {@link cadex.ModelPrs_SelectionMode ModelPrs_SelectionMode}.
         */
        globalSelectionMode: number;
        /**
         * Camera projection type. Should be one of {@link cadex.ModelPrs_DisplayMode ModelPrs_DisplayMode}.
         */
        globalDisplayMode: number;
        /**
         * Indicates how to hide visual objects:
         * if true hidden objects will be displayed as semitransparent objects (ghosts).
         */
        ghostMode: boolean;
        /**
         * Enables auto objects selection on `tap` viewport event.
         */
        autoSelection: boolean;
        /**
         * Bounding box of whole scene.
         */
        readonly boundingBox: ModelData_Box;
        /**
         * Adds the specified JavaScript function to the list of event listeners for the specified event type on which it is called.
         * @param theType - A case-sensitive string representing the event type to listen for.
         * @param theListener - The JavaScript function which receives a notification when an event of the specified type occurs.
         */
        addEventListener(theType: "selectionChanged", theListener: (...params: any[]) => any): void;
        /**
         * Removes an event listener previously registered with {@link cadex.ModelPrs_ViewPort#addEventListener addEventListener()}.
         * @param theType - A string which specifies the type of event for which to remove an event listener.
         * @param theListener - The JavaScript function of the event handler to remove from the event target.
         */
        removeEventListener(theType: "selectionChanged", theListener: (...params: any[]) => any): void;
        /**
         * Add object or array of objects to the scene and display it.
         * @param theObjects - The objects to display.
         * @param [theDisplayMode = -1] - The mode to be displayed with. Default is {@link cadex.ModelPrs_DisplayMode ModelPrs_DisplayMode.Global}
         * @param [theSelectionMode = -2] - The selection mode to be display with. Default is {@link cadex.ModelPrs_SelectionMode ModelPrs_SelectionMode.Global}
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        display(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theDisplayMode?: ModelPrs_DisplayMode, theSelectionMode?: ModelPrs_SelectionMode, theRedraw?: boolean): void;
        /**
         * Erase view3d object or array of objects from the scene. Objects will be hide only.
         * Internal data structures will not be destroyed.
         * @param theObjects - The objects to erase.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        hide(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theRedraw?: boolean): void;
        /**
         * Hide all view3d objects on scene. Objects will not removed.
         * Internal data structures will not be destroyed.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        hideAll(theRedraw?: boolean): void;
        /**
         * Remove view3d object or array of objects from the scene.
         * @param theObjects - The objects to remove.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        remove(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theRedraw?: boolean): void;
        /**
         * Remove all view3d objects from scene.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        removeAll(theRedraw?: boolean): void;
        /**
         * Attempts to pick an {@link cadex.ModelPrs_View3dObject View3d object} on this scene.
         */
        pick(theOriginOrRay: ModelData_XYZ | ModelData_Ray, theDirection?: ModelData_XYZ): ModelPrs_PickResult | undefined;
        /**
         * Select view3d object or array of objects from the scene.
         * @param theObjects - The objects to remove.
         * @param [theBreakSelection = true] - The unselected previously selected objects.
         * @param [theDispatchEvent = true] - Indicates 'selected' event dispatch or not.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        select(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theBreakSelection?: boolean, theDispatchEvent?: boolean, theRedraw?: boolean): void;
        /**
         * Deselect view3d object or array of objects from the scene.
         * @param theObjects - The objects to remove.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        deselect(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theRedraw?: boolean): void;
        /**
         * Deselect all view3d object on the scene.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        deselectAll(theRedraw?: boolean): void;
        /**
         * Inverts selection of passed objects. If object is selected it will be deselected. If object is not selected it will be selected.
         * @param theObjects - The objects to select or deselect.
         * @param theRedraw - The redraw viewPorts attached to this scene.
         */
        invertSelection(theObjects: ModelPrs_View3dObject[] | ModelPrs_View3dObject, theRedraw: boolean): void;
        /**
         * Add global clip plane to the scene.
         * Returns id of the plane, which can be used to remove it using {@link cadex.ModelPrs_Scene#removeGlobalClippingPlane removeGlobalClippingPlane()} method
         * or to change it using {@link cadex.ModelPrs_Scene.changeGlobalClippingPlane changeGlobalClippingPlane}.
         * @param thePlane - The clip plane.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        addGlobalClippingPlane(thePlane: ModelData_Plane, theRedraw?: boolean): number;
        /**
         * Change global clip plane.
         * @param thePlaneId - The plane id.
         * @param thePlane - The new clip plane.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        changeGlobalClippingPlane(thePlaneId: number, thePlane: ModelData_Plane, theRedraw?: boolean): void;
        /**
         * Remove clip plane from the scene.
         * @param thePlaneId - The plane id.
         * @param [theRedraw = true] - The redraw viewPorts attached to this scene.
         */
        removeGlobalClippingPlane(thePlaneId: number, theRedraw?: boolean): void;
    }
    /**
     * Displayer which simple displays {@link cadex.ModelPrs_View3dObject ModelPrs_View3dObjects} on the {@link cadex.ModelPrs_Scene scene}.
     * @param theScene - Scene for displaying on.
     */
    class ModelPrs_SceneDisplayer {
        constructor(theScene: ModelPrs_Scene);
        display(theView3dObjects: ModelPrs_View3dObject[], theRepresentation: ModelData_Representation, theAncestors: ModelData_SceneGraphElement[], theDisplayMode: ModelPrs_DisplayMode): void;
    }
    /**
     * Selection mode for visualization.
     */
    enum ModelPrs_SelectionMode {
        Global = -2,
        None = -1,
        Shape = 0,
        Vertex = 1
    }
    /**
     * Represent visual boundary box.
     */
    class ModelPrs_View3dBoxObject extends ModelPrs_View3dObject {
        constructor(theBoxOrObjects: ModelData_Box | ModelPrs_View3dObject | ModelPrs_View3dObject[], theColor: ModelData_ColorObject);
    }
    /**
     * Creates an instance of ModelPrs_View3dDimensionObject.
     */
    class ModelPrs_View3dDimensionObject extends ModelPrs_View3dObject {
        constructor(theImpl: any);
        /**
         * Value of dimension
         */
        readonly value: number;
        /**
         * Indicate whether show unit display
         */
        readonly unitsDisplayed: boolean;
        /**
         * Length units
         */
        readonly lengthDisplayUnits: number;
        setLengthDisplayUnits(theUnit: Base_LengthUnit): void;
        setAngleDisplayUnits(theUnit: Base_AngleUnit): void;
    }
    /**
     * Creates an instance of ModelPrs_View3dObject.
     */
    class ModelPrs_View3dObject {
        constructor(theImpl?: any);
        /**
         * Bounding box of the visual object
         */
        readonly boundingBox: ModelData_Box;
    }
    /**
     * {@link cadex.ModelPrs_ViewPort} configuration interface.
     */
    interface ModelPrs_ViewPortConfig {
        /**
         * Shows view cube control at the top right corner. Default is <code>true</code>.
         */
        showViewCube?: boolean | undefined;
        /**
         * Initial camera type. Default is <code>Isometric</code>.
         */
        cameraType?: ModelPrs_CameraProjectionType | undefined;
        /**
         * Make fitall operation for camera Z axis automatically when required. Default is <code>true</code>.
         */
        autoZFitAll?: boolean | undefined;
        /**
         * Tab index which will be assigned to canvas. Default is <code>0</code>.
         */
        tabIndex?: number | undefined;
    }
    type ModelPrs_CameraChangedEvent = {
        type: 'cameraChanged';
    };
    namespace ModelPrs_ViewPort {
        /**
         * Viewport tap event.
         */
        type TapEvent = {
            type: "tap";
            point: ModelData_XY;
            normalizedPoint: ModelData_XY;
            ray: ModelData_Ray;
            shiftKey: boolean;
            ctrlKey: boolean;
        };
        /**
         * Viewport context menu event (mouse right button click).
         */
        type ContextMenuEvent = {
            type: "contextMenu";
            point: ModelData_XY;
            normalizedPoint: ModelData_XY;
            ray: ModelData_Ray;
            shiftKey: boolean;
            ctrlKey: boolean;
        };
    }
    /**
     * Creates an instance of ModelPrs_ViewPort.
     * @param [theConfig] - The config of viewPort.
     * @param [theDomElement] - The dom element to attach to.
     */
    class ModelPrs_ViewPort {
        constructor(theConfig?: ModelPrs_ViewPortConfig, theDomElement?: HTMLElement);
        /**
         * Camera projection type.
         */
        cameraProjectionType: ModelPrs_CameraProjectionType;
        /**
         * Indicates enabled or disabled hover in the viewport.
         */
        hoverEnabled: boolean;
        /**
         * Dom element.
         */
        domElement: HTMLElement;
        /**
         * Adds the specified JavaScript function to the list of event listeners for the specified event type on which it is called.
         * @param theType - A case-sensitive string representing the event type to listen for.
         * @param theListener - The JavaScript function which receives a notification when an event of the specified type occurs.
         */
        addEventListener(theType: "cameraChanged" | "frameRendered" | "tap" | "contextMenu", theListener: (...params: any[]) => any): void;
        /**
         * Removes an event listener previously registered with {@link cadex.ModelPrs_ViewPort#addEventListener addEventListener()}.
         * @param theType - A string which specifies the type of event for which to remove an event listener.
         * @param theListener - The JavaScript function of the event handler to remove from the event target.
         */
        removeEventListener(theType: "cameraChanged" | "frameRendered" | "tap" | "contextMenu", theListener: (...params: any[]) => any): void;
        getCameraProperties(): ModelPrs_CameraState;
        /**
         * @param to - State of camera animate to
         */
        changeCamera(to: ModelPrs_CameraState): Promise<void>;
        /**
         * Attach current viewport to scene to render its content.
         * @param theScene - The scene to attach to.
         */
        attachToScene(theScene: ModelPrs_Scene): void;
        /**
         * Detach current viewport from scene.
         * @param theScene - The scene to detach from.
         */
        detachFromScene(theScene: ModelPrs_Scene): void;
        /**
         * Resize viewport.
         * @param theWidth - The width of the viewport.
         * @param theHight - The height of the viewport.
         */
        resize(theWidth: number, theHight: number): void;
        toOrthographicCamera(): void;
        toPerspectiveCamera(): void;
        /**
         * Schedule new frame rendering.
         */
        update(): void;
        /**
         * Fit camera to see all objects on the scene.
         * @param [theRedraw = true] - The redraw viewport flag.
         */
        fitAll(theRedraw?: boolean): void;
        /**
         * Fit camera to see all objects in the box
         * @param theBox - the box to fit to.
         * @param [theRedraw = true] - The redraw viewport flag.
         */
        fitBox(theBox: ModelData_Box, theRedraw?: boolean): void;
        /**
         * Fitall camera in Z axis.
         */
        zFitAll(): void;
        /**
         * Adds marker to the viewport
         */
        addMarker(theMarker: ModelPrs_Marker): boolean;
        /**
         * Removes marker from the viewport
         */
        removeMarker(theMarker: ModelPrs_Marker): boolean;
        /**
         * Translate point in viewer (3d point) to 2d point on the screen (viewport point)
         */
        globalCoordsToScreen(theLocalCoords: ModelData_XYZ): ModelData_XY;
    }
}

export default cadex;