package com.carvea.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
@RequestMapping("/uploads")
public class ImageController {

    @GetMapping("/{folder}/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String folder, @PathVariable String filename) throws MalformedURLException {
        Path imagePath = Path.of("uploads", folder, filename);
        Resource resource = new UrlResource(imagePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found!");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)  // Change type if needed
                .body(resource);
    }
}

