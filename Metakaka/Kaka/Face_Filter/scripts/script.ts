/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Meta Spark Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Meta Spark Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
import Scene from 'Scene';
import Diagnostics from 'Diagnostics';
import Reactive from 'Reactive';

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

;(async function () {  // Enables async/await in JS [part 1]

    // To access scene objects
    // const [directionalLight] = await Promise.all([
    //   Scene.root.findFirst('directionalLight0') as Promise<DirectionalLightSource>
    // ]);

    // To set signal properties, use Reactive.val.
    // Typescript tries to ensure type safety of property types like this and it does not
    // know that primitives can be assigned to signals.
    // directionalLight.intensity = Reactive.val(0.7);
    // To access class properties
    // const directionalLightIntensity = directionalLight.intensity;

    // To log messages to the console
    // Diagnostics.log('Console message logged from the script.');

})(); // Enables async/await in JS [part 2]


const Scene = require('Scene');
const FaceTracking = require ('FaceTracking');

(async function () {
    const [plane, face] = await Promise.all ([
        Scene.root.findFirst ("plane0"),
        FaceTracking.face(0)
    ])
})