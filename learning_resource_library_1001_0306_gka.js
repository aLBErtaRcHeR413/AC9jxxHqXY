// 代码生成时间: 2025-10-01 03:06:25
// Dependencies
const fs = require('fs');
const path = require('path');

// Define the path to the JSON file where resources will be stored
const resourcesFilePath = path.join(__dirname, 'resources.json');

// Define the LearningResourceLibrary class
class LearningResourceLibrary {
  constructor() {
    // Initialize the resources array if the file doesn't exist or is empty
    this.resources = this.loadResources();
  }

  // Load resources from the file system
  loadResources() {
    try {
      const fileContents = fs.readFileSync(resourcesFilePath);
      return fileContents.length > 0 ? JSON.parse(fileContents) : [];
    } catch (error) {
      console.error('Error loading resources:', error);
      return [];
    }
  }

  // Save resources to the file system
  saveResources() {
    try {
      fs.writeFileSync(resourcesFilePath, JSON.stringify(this.resources, null, 2));
    } catch (error) {
      console.error('Error saving resources:', error);
    }
  }

  // Add a new resource
  addResource(resource) {
    if (!resource || typeof resource !== 'object') {
      throw new Error('Resource must be an object');
    }
    this.resources.push(resource);
    this.saveResources();
  }

  // Retrieve all resources
  getAllResources() {
    return this.resources;
  }

  // Retrieve a resource by ID
  getResourceById(id) {
    const resource = this.resources.find(r => r.id === id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  }

  // Update an existing resource
  updateResource(id, updatedResource) {
    const index = this.resources.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Resource not found');
    }
    this.resources[index] = { ...this.resources[index], ...updatedResource };
    this.saveResources();
  }

  // Delete a resource by ID
  deleteResource(id) {
    const index = this.resources.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Resource not found');
    }
    this.resources.splice(index, 1);
    this.saveResources();
  }
}

// Export the LearningResourceLibrary class
module.exports = LearningResourceLibrary;
