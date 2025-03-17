#  Vincent's Updates – 17 Mar 2025 

In this update, I am exploring non-binary edit direction discovery in H-space with only positive samples. My primary objectives is to find a method that is able to:
1. Use only positive examples that exhibit the target attribute/style.
2. Identify a direction ΔhT:1 that, when added during sampling, yields images that become indistinguishable from the positive set.
3. Preserve the identity of the subject from the original sample.

In this update, I will cover two methods, a naive and a VAE-based approach.

## Preliminaries: The H-Space
The H-space is defined as the set of bottleneck activations `ht` across the T timesteps in the synthesis process. Specifically, these activations come from the deepest bottleneck layer of the U-Net. For context, consider the pretrained DDPM model (released by Google) which operates on input images of size `[3, 256, 256]` and produces a deepest feature map of size `[512, 8, 8]`. Consequently, an element in H-space, denoted as `hT:1`, has dimensions `[T, 512, 8, 8]`.

![h_space](/ra/updates_25_03_17/h_space.png)

## The Naive Approach
The naive method computes the edit direction `Δh` by taking the difference between the mean H-space representations of positive samples and a set of random (treated as negative) samples. This simple arithmetic approach aims to push a given sample toward the positive distribution.

![baseline_eq](/ra/updates_25_03_17/baseline_eq.png)

While straightforward, this method struggles when the positive samples are not well-aligned.

## VAE
To address the shortcomings of the naive method, I developed a VAE-based approach. Here, a Variational Autoencoder is trained solely on positive examples, ensuring that it learns an accurate reconstruction of the target style. When an input H-code is optimized to minimize the reconstruction loss, it effectively gets nudged onto the manifold of positive samples.

![vae_eq](/ra/updates_25_03_17/vae_eq.png)

This method shows considerable promise, as evidenced by the improved consistency in the edited outputs.

## Results

A direct comparison between the two methods highlights the advantages of using a VAE-based edit direction. The VAE approach consistently achieves edits that are more faithful to the positive sample characteristics while preserving the subject's identity.

![comparison_grid](/ra/updates_25_03_17/comparison_grid.png)

| Aligned Faces: |
|---|
| ![aligned_faces](/ra/updates_25_03_17/aligned_faces.png) |

| Unaligned Faces: |
|---|
| ![unaligned_faces](/ra/updates_25_03_17/unaligned_faces.png) |

## Summary and Challenges
The use of VAE for H-space editing with only positive samples seems promising. While this method successfully meets the initial objectives using Google's `ddpm-ema-celebahq-256 model`, extending these results to other architectures is still an issue. Specifically, I have attempted to apply this method to OpenAI's `256x256_diffusion_uncond` and `stable-diffusion-v1-5`, but my tests indicate that the H-space in these models demands different handling. Successfully adapting our approach to these models could enable a broader range of edits like horse-to-zebra or orange-to-apple, for example.

![horse2zebra](/ra/updates_25_03_17/horse2zebra.png)