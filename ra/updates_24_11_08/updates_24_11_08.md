#  Vincent's Updates – 08 Nov 2024 

Previously, we have seen that it is possible to use W+ Adapter in text-to-video models such as AnimateDiff with just a simple trick of passing the combined text embedding from W+ Adapter into a T2V model. However, after further experiments, I found that the result is inconsistent. The effect on the faces are oftentimes minimal, or even none.

## Initial Approach: Direct Embedding Integration

| ![no smile](/ra/updates_24_10_22/no_smile.gif) | ![smile](/ra/updates_24_10_22/smile.gif) | ![no smile](/ra/updates_24_11_08/Realistic_Vision_V6.0_B1_noVAE_no_smile.gif) | ![smile](/ra/updates_24_11_08/Realistic_Vision_V6.0_B1_noVAE_smile.gif) |
|---|---|---|---|
| *Expression: smile -8* | *Expression: smile +8* | *Expression: smile -8* | *Expression: smile +8* |

## Improved Method: Residual Cross-Attention Integration

To address these limitations, I integrated the Residual Cross-Attention module from W+ Adapter directly into the AnimateDiff pipeline. This approach yields more consistent and controllable results:

| ![oliver_-2](/ra/updates_24_11_08/oliver_-2.gif) | ![oliver_.gif](/ra/updates_24_11_08/oliver_0.gif) | ![oliver_+2](/ra/updates_24_11_08/oliver_2.gif) | ![oliver_+4](/ra/updates_24_11_08/oliver_4.gif) |
|---|---|---|---|
| *Expression: smile -2* | *Expression: smile 0* | *Expression: smile +2* | *Expression: smile +4* |

| ![trump_flag_-2](/ra/updates_24_11_08/trump_flag_-2.gif) | ![trump_flag_0.gif](/ra/updates_24_11_08/trump_flag_0.gif) | ![trump_flag_+2](/ra/updates_24_11_08/trump_flag_2.gif) | ![trump_flag_+4](/ra/updates_24_11_08/trump_flag_4.gif) |
|---|---|---|---|
| *Expression: smile -2* | *Expression: smile 0* | *Expression: smile +2* | *Expression: smile +4* |


| ![chris_-2](/ra/updates_24_11_08/chris_-2.gif) | ![chris_0.gif](/ra/updates_24_11_08/chris_0.gif) | ![chris_+2](/ra/updates_24_11_08/chris_2.gif) | ![chris_+4](/ra/updates_24_11_08/chris_4.gif) |
|---|---|---|---|
| *Expression: smile -2* | *Expression: smile 0* | *Expression: smile +2* | *Expression: smile +4* |

## Direct Video Generation without GAN Inversion

This method also work even without any e4e latent from GAN inversion, making it possible to directly edit the generation of a video. In the traditional W+ Adapter approach, the feature representation is defined as:

```
fw = w + αn
```
where:
- `z` represents the identity latent code
- `α` is the direction scale
- `n` is the edit direction vector

However, without any `z`, the magnitude of n is no longer relevant since `fz` is now only a vector of the edit and not an identity (it is now only the direction of "smile", not "a man with big smile").

Instead of scaling `α`, this can done by scaling `λ`, a parameter to control the influence of the identity condition. It is defined as follows:

```
f″z = f′z + λ · Attention(Q†, K†, V†)
```

Here are some of the results:

| ![age_-0.3](/ra/updates_24_11_08/age_-0.3.gif) | ![age_0.gif](/ra/updates_24_11_08/age_0.gif) | ![age_+0.1](/ra/updates_24_11_08/age_0.1.gif) | ![age_+0.3](/ra/updates_24_11_08/age_0.3.gif) |
|---|---|---|---|
| *Expression: age -0.3* | *Expression: age 0. | *Expression: age +0.1* | *Expression: age +0.3* |

| ![smile_-0.3](/ra/updates_24_11_08/smile_-0.3.gif) | ![smile_0.gif](/ra/updates_24_11_08/smile_0.gif) | ![smile_+0.1](/ra/updates_24_11_08/smile_0.1.gif) | ![smile_+0.3](/ra/updates_24_11_08/smile_0.3.gif) |
|---|---|---|---|
| *Expression: smile -0.3* | *Expression: smile 0. | *Expression: smile +0.1* | *Expression: smile +0.3* |

## Dynamic Expression Changes

The method also enables smooth transitions between different expression states:

| ![smile_-1-0-1](/ra/updates_24_11_08/smile_-1-0-1.gif) | ![smile_0-1-0.gif](/ra/updates_24_11_08/smile_0-1-0.gif) |
|---|---|
| *Expression: smile -0.7 > 0 > 0.7* | *Expression: smile 0 > 0.7 > 0* |

## Summary

The integration of Residual Cross-Attention from W+ Adapter into AnimateDiff shows promising results the facial attribute editing in video generation. This approach:
1. Provides more consistent results than direct embedding integration
2. Works without requiring GAN inversion
3. Enables smooth transitions between different attribute states
4. Offers precise control through the λ parameter