import { getUid } from 'ol';
import { Source } from 'ol/source';
import Layer from 'ol/layer/Layer';
import LayerRenderer from 'ol/renderer/Layer';

/**
 * Checks have layers same ids
 * @param newLayers Incoming layer(s)
 * @param oldLayers Existing layer(s)
 * @returns {boolean} true if new layers(s) have same id(s)
 */
export const areLayersEqual = (
  newLayers: Layer<Source, LayerRenderer<any>>[],
  oldLayers: Layer<Source, LayerRenderer<any>>[]
): boolean =>
  newLayers.length === oldLayers.length &&
  newLayers.every((layer, index) => getUid(layer) === getUid(oldLayers[index]));

/**
 * Type guard to check is instance OpenLayers Layer
 * @param {any} layer OpenLayers layer (any type)
 * @returns {boolean} Return true if satisfies Layer type
 */
export const isLayer = (layer: any): layer is Layer => layer instanceof Layer;
