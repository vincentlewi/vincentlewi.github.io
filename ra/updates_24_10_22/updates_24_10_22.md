##  Vincent's Updates – 22 Oct 2024 

Here we are trying to design an adapter from W+, a latent space in StyleGAN, to perform **video editing**. As such, one of the most relevant paper is [W+ Adapter: When StyleGAN Meets Stable Diffusion](https://github.com/csxmli2016/w-plus-adapter). Let's take a look at how they perform first.

|![alt text](/ra/updates_24_10_22/woman_astronaut.png)|
|---|
|*prompt: a woman wearing a spacesuit*|

The **W+ Adapter**, based on SD1.5, performs reasonably well when generating new images, as shown above. However, it fails significantly when applied to editing real-world images.

|![trump_original](/ra/updates_24_10_22/trump.png)|![trump_old](/ra/updates_24_10_22/trump_old.png)|![trump_new](/ra/updates_24_10_22/trump_new.png)|
|---|---|---|
|Real-world Image|Original Method|Improved Method|

To understand why, we need to examine the editing method proposed by the authors.

![wplus_architecture](/ra/updates_24_10_22/wplus_architecture.png)

From the diagram above, the model uses BLIP2 to generate a caption that describes the image, which is then used as the conditioning prompt. However, text alone cannot fully represent the original image, which makes the original method incompatible with editing real-world images.

### The Naive Approach

When applying this technique to videos using a naive frame-by-frame approach, further issues arise.

| ![man_original](/ra/updates_24_10_22/man.gif) | ![man_old](/ra/updates_24_10_22/man_result_old.gif) | ![man_new](/ra/updates_24_10_22/man_result_avg.gif) |
|---|---|---|
| *Real-world Video* | *Original Method* | *Improved Method* |

Since many video frames are visually similar, BLIP2 also produces identical text description, leading to many identical output frames. oreover, not all faces in each frame are detected by StyleGAN’s decoder, resulting in dropped frames when the W+ latent cannot be mapped from the corresponding image.

| ![hoodie_original](/ra/updates_24_10_22/hoodie.gif) | ![hoodie_old](/ra/updates_24_10_22/hoodie_result_old.gif) | ![hoodie_new](/ra/updates_24_10_22/hoodie_result_avg.gif) |
|---|---|---|
| *Real-world Video* | *Original Method* | *Improved Method* |

### Improvements Made

To address these issues, I implemented several modifications to the model architecture:

![wplus_new_architecture](/ra/updates_24_10_22/wplus_new_architecture.png)

1. **Partial Denoising**: Instead of generating images from scratch, I introduced partial denoising starting from step T/2. This helps retain the original image features while enabling edits.
   
   > Could textual inversion be a viable alternative?

2. **Shared Latent**: The W+ latent space is now averaged across all detected faces in the video, which eliminates missing frames and improves stability by using consistent latents for each frame.

3. **BLIP2 Removal**: BLIP2 was removed entirely. Since W+ latent mappings are sufficient to guide the diffusion process, especially in later stages where low-level attributes like faces are defined, text descriptions from BLIP2 were redundant for this task. This aligns with findings from [this paper](https://arxiv.org/pdf/2305.16225).

The updated method works well, but there are still consistency issues that I plan to address using a text-to-video model.

---

### Text-to-Video Model Integration

After confirming that this method works, I tried to adapt this approach  to [AnimateDiff](https://github.com/guoyww/AnimateDiff), a recent text-to-video model that is also based on SD1.5. 

![new_pipe](/ra/updates_24_10_22/new_pipe.png)

I attempted to pass the prompt embeddings generated by the W+ Adapter directly into AnimateDiff. The results are promising:

| ![no smile](/ra/updates_24_10_22/no_smile.gif) | ![smile](/ra/updates_24_10_22/smile.gif) |
|---|---|
| *Expression: smile -8* | *Expression: smile +8* |

As you can see, it works very well. We can confirm that editing facial expressions in videos using this method is viable. However, I am still struggling with editing real-world videos.

### Summary

**Main Updates:**
- Introduced partial denoising to enable real-world image editing.
- Averaged W+ latent vectors across frames for better stability and coverage.
- Removed BLIP2 to rely solely on W+ latent mappings.
- Integrated W+ Adapter embeddings into AnimateDiff for video editing.

**Minor Updates:**
- Added support for arbitrary resolutions (previously limited to 512x512).

**Next Steps:**
- Explore the use of textual inversion as an alternative to partial denoising.
- Investigate how to extend this method to real-world video editing.